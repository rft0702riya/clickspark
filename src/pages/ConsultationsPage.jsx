import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Search, 
  Eye, 
  ArrowLeft,
  Phone,
  Mail,
  Building,
  Clock,
  Download,
  RefreshCw,
  Trash2,
  Send
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ConsultationsPage = () => {
  const navigate = useNavigate();
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);

  // Fetch consultations data
  const fetchConsultations = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/hr/consultations', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setConsultations(data.data);
      } else {
        console.error('Failed to fetch consultations');
      }
    } catch (error) {
      console.error('Error fetching consultations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, []);

  // Filter consultations based on search
  const filteredConsultations = consultations.filter(consultation => {
    const matchesSearch = consultation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (consultation.phone && consultation.phone.includes(searchTerm)) ||
                         (consultation.company && consultation.company.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  // Delete consultation
  const deleteConsultation = async (consultationId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/consultation/requests/${consultationId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        fetchConsultations(); // Refresh data
        setShowDeleteModal(false);
      }
    } catch (error) {
      console.error('Error deleting consultation:', error);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Generate automatic email content
  const generateAutoEmail = (consultation) => {
    const subject = `Thank you for your consultation request - ${consultation.company || 'ClickSpark'}`;
    const message = `Dear ${consultation.name},

Thank you for submitting your consultation request with ClickSpark. We have received your inquiry and our team will review your project details.

Project Details:
- Company: ${consultation.company || 'Not specified'}
- Preferred Date/Time: ${consultation.preferred_datetime ? formatDate(consultation.preferred_datetime) : 'Not specified'}

We will contact you within 24-48 hours to discuss your project requirements and schedule a detailed consultation.

If you have any immediate questions, please don't hesitate to reach out to us.

Best regards,
The ClickSpark Team
Email: info@clickspark.com
Phone: +1 (555) 123-4567`;

    return { subject, message };
  };

  // Send email
  const sendEmail = async (consultationId, toEmail, subject, message) => {
    try {
      setSendingEmail(true);
      console.log('Sending email to:', toEmail);
      console.log('Email subject:', subject);
      
      const response = await fetch('http://localhost:5000/api/hr/send-email', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: toEmail,
          subject: subject,
          message: message,
          consultationId: consultationId
        })
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (response.ok) {
        const result = await response.json();
        console.log('Email sent successfully:', result);
        alert('Email sent successfully!');
        setShowEmailModal(false);
        setEmailSubject('');
        setEmailMessage('');
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Email sending failed:', errorData);
        alert(`Failed to send email: ${errorData.message || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert(`Error sending email: ${error.message}`);
    } finally {
      setSendingEmail(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <motion.button
              onClick={() => navigate('/hr-dashboard')}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
            <motion.div 
              className="text-center flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-3xl font-bold text-gray-900">
                Consultation Requests
              </h1>
              <p className="text-gray-600">
                View and manage all consultation form submissions
              </p>
            </motion.div>
          </div>
          
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-green-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Total Requests</p>
                  <p className="text-2xl font-bold text-gray-900">{consultations.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">This Week</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {consultations.filter(c => {
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return new Date(c.created_at) > weekAgo;
                    }).length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center">
                <Building className="w-8 h-8 text-purple-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Companies</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {new Set(consultations.map(c => c.company).filter(Boolean)).size}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-6"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, email, phone, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Clear Button */}
            <div className="flex gap-4">
              <button
                onClick={() => setSearchTerm('')}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </motion.div>

        {/* Consultations Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Consultation Requests ({filteredConsultations.length})
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={fetchConsultations}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading consultations...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Preferred Date/Time
                    </th>
                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                       Submitted
                     </th>
                     <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                       Email
                     </th>
                     <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                       Actions
                     </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredConsultations.map((consultation) => (
                    <motion.tr
                      key={consultation.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center text-white font-semibold">
                              {consultation.name.charAt(0).toUpperCase()}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{consultation.name}</div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {consultation.email}
                            </div>
                            {consultation.phone && (
                              <div className="text-sm text-gray-500 flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {consultation.phone}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {consultation.company ? (
                          <div className="flex items-center">
                            <Building className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-900">{consultation.company}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">
                            {consultation.preferred_datetime ? formatDate(consultation.preferred_datetime) : 'Not specified'}
                          </span>
                        </div>
                      </td>
                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                         {formatDate(consultation.created_at)}
                       </td>
                       <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                         <div className="flex items-center justify-center gap-2">
                           <button
                             onClick={() => {
                               const autoEmail = generateAutoEmail(consultation);
                               setEmailSubject(autoEmail.subject);
                               setEmailMessage(autoEmail.message);
                               setSelectedConsultation(consultation);
                               setShowEmailModal(true);
                             }}
                             className="text-blue-600 hover:text-blue-900 p-1"
                             title="Send Auto Email"
                           >
                             <Send className="w-4 h-4" />
                           </button>
                           <button
                             onClick={() => {
                               setSelectedConsultation(consultation);
                               setEmailSubject('');
                               setEmailMessage('');
                               setShowEmailModal(true);
                             }}
                             className="text-purple-600 hover:text-purple-900 p-1"
                             title="Write Custom Email"
                           >
                             <Mail className="w-4 h-4" />
                           </button>
                         </div>
                       </td>
                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                         <div className="flex items-center justify-end gap-2">
                           <button
                             onClick={() => {
                               setSelectedConsultation(consultation);
                               setShowConsultationModal(true);
                             }}
                             className="text-green-600 hover:text-green-900 p-1"
                           >
                             <Eye className="w-4 h-4" />
                           </button>
                           <button
                             onClick={() => {
                               setSelectedConsultation(consultation);
                               setShowDeleteModal(true);
                             }}
                             className="text-red-600 hover:text-red-900 p-1"
                           >
                             <Trash2 className="w-4 h-4" />
                           </button>
                         </div>
                       </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && filteredConsultations.length === 0 && (
            <div className="p-8 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No consultation requests found matching your criteria</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Consultation Details Modal */}
      {showConsultationModal && selectedConsultation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-lg font-semibold mb-4">Consultation Details</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Client Name</label>
                <p className="text-gray-900">{selectedConsultation.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <p className="text-gray-900">{selectedConsultation.email}</p>
              </div>
              {selectedConsultation.phone && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  <p className="text-gray-900">{selectedConsultation.phone}</p>
                </div>
              )}
              {selectedConsultation.company && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Company</label>
                  <p className="text-gray-900">{selectedConsultation.company}</p>
                </div>
              )}
              {selectedConsultation.preferred_datetime && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Preferred Date & Time</label>
                  <p className="text-gray-900">{formatDate(selectedConsultation.preferred_datetime)}</p>
                </div>
              )}
              {selectedConsultation.message && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Project Description</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedConsultation.message}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-gray-700">Submitted</label>
                <p className="text-gray-900">{formatDate(selectedConsultation.created_at)}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowConsultationModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedConsultation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-lg font-semibold mb-4 text-red-600">Delete Consultation</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the consultation request from <strong>{selectedConsultation.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteConsultation(selectedConsultation.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </motion.div>
                 </div>
       )}

       {/* Email Modal */}
       {showEmailModal && selectedConsultation && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
           >
             <h3 className="text-lg font-semibold mb-4">Send Email to {selectedConsultation.name}</h3>
             <div className="space-y-4">
               <div>
                 <label className="text-sm font-medium text-gray-700">To:</label>
                 <p className="text-gray-900">{selectedConsultation.email}</p>
               </div>
               <div>
                 <label className="text-sm font-medium text-gray-700">Subject:</label>
                 <input
                   type="text"
                   value={emailSubject}
                   onChange={(e) => setEmailSubject(e.target.value)}
                   className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                   placeholder="Enter email subject..."
                 />
               </div>
               <div>
                 <label className="text-sm font-medium text-gray-700">Message:</label>
                 <textarea
                   value={emailMessage}
                   onChange={(e) => setEmailMessage(e.target.value)}
                   rows={12}
                   className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                   placeholder="Enter your message..."
                 />
               </div>
             </div>
             <div className="mt-6 flex justify-end gap-3">
               <button
                 onClick={() => {
                   setShowEmailModal(false);
                   setEmailSubject('');
                   setEmailMessage('');
                 }}
                 className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
               >
                 Cancel
               </button>
               <button
                 onClick={() => sendEmail(selectedConsultation.id, selectedConsultation.email, emailSubject, emailMessage)}
                 disabled={sendingEmail || !emailSubject || !emailMessage}
                 className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
               >
                 {sendingEmail ? 'Sending...' : 'Send Email'}
               </button>
             </div>
           </motion.div>
         </div>
       )}
     </div>
   );
 };

export default ConsultationsPage;
