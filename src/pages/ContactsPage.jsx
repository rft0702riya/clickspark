import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Search, 
  Eye, 
  ArrowLeft,
  Phone,
  Building,
  Globe,
  DollarSign,
  MapPin,
  Download,
  RefreshCw,
  Trash2,
  Send
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ContactsPage = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);

  // Fetch contacts data
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/hr/contacts', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setContacts(data.data);
      } else {
        console.error('Failed to fetch contacts');
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Filter contacts based on search
  const filteredContacts = contacts.filter(contact => {
    const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (contact.phone && contact.phone.includes(searchTerm)) ||
                         (contact.company && contact.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (contact.website && contact.website.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesSearch;
  });

  // Delete contact
  const deleteContact = async (contactId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/contact/${contactId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        fetchContacts(); // Refresh data
        setShowDeleteModal(false);
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
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

  // Format revenue
  const formatRevenue = (revenue) => {
    if (!revenue) return '-';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(revenue);
  };

  // Generate automatic email content
  const generateAutoEmail = (contact) => {
    const subject = `Thank you for contacting ClickSpark - ${contact.company || 'Inquiry'}`;
    const message = `Dear ${contact.firstName} ${contact.lastName},

Thank you for reaching out to ClickSpark. We have received your inquiry and appreciate your interest in our services.

Contact Details:
- Company: ${contact.company || 'Not specified'}
- Website: ${contact.website || 'Not specified'}
- Revenue: ${formatRevenue(contact.revenue)}
- Country: ${contact.country}

Our team will review your message and get back to you within 24-48 hours with a detailed response and next steps.

If you have any immediate questions, please don't hesitate to reach out to us.

Best regards,
The ClickSpark Team
Email: info@clickspark.com
Phone: +1 (555) 123-4567`;

    return { subject, message };
  };

  // Send email
  const sendEmail = async (contactId, toEmail, subject, message) => {
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
          contactId: contactId
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
                Contact Form Submissions
              </h1>
              <p className="text-gray-600">
                View and manage all contact form submissions
              </p>
            </motion.div>
          </div>
          
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center">
                <Mail className="w-8 h-8 text-yellow-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Total Contacts</p>
                  <p className="text-2xl font-bold text-gray-900">{contacts.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center">
                <Building className="w-8 h-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Companies</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {new Set(contacts.map(c => c.company).filter(Boolean)).size}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center">
                <MapPin className="w-8 h-8 text-green-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Countries</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {new Set(contacts.map(c => c.country).filter(Boolean)).size}
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
                  placeholder="Search by name, email, phone, company, or website..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Clear Button */}
            <div className="flex gap-4">
              <button
                onClick={() => setSearchTerm('')}
                className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </motion.div>

        {/* Contacts Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Contact Submissions ({filteredContacts.length})
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={fetchContacts}
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
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading contacts...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Website
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenue
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Country
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
                  {filteredContacts.map((contact) => (
                    <motion.tr
                      key={contact.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-semibold">
                              {contact.firstName.charAt(0).toUpperCase()}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {contact.firstName} {contact.lastName}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {contact.email}
                            </div>
                            {contact.phone && (
                              <div className="text-sm text-gray-500 flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {contact.phone}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {contact.company ? (
                          <div className="flex items-center">
                            <Building className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-900">{contact.company}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {contact.website ? (
                          <div className="flex items-center">
                            <Globe className="w-4 h-4 text-gray-400 mr-2" />
                            <a 
                              href={contact.website.startsWith('http') ? contact.website : `https://${contact.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:text-blue-800"
                            >
                              {contact.website}
                            </a>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">{formatRevenue(contact.revenue)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">{contact.country}</span>
                        </div>
                      </td>
                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                         {formatDate(contact.created_at)}
                       </td>
                       <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                         <div className="flex items-center justify-center gap-2">
                           <button
                             onClick={() => {
                               const autoEmail = generateAutoEmail(contact);
                               setEmailSubject(autoEmail.subject);
                               setEmailMessage(autoEmail.message);
                               setSelectedContact(contact);
                               setShowEmailModal(true);
                             }}
                             className="text-blue-600 hover:text-blue-900 p-1"
                             title="Send Auto Email"
                           >
                             <Send className="w-4 h-4" />
                           </button>
                           <button
                             onClick={() => {
                               setSelectedContact(contact);
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
                               setSelectedContact(contact);
                               setShowContactModal(true);
                             }}
                             className="text-yellow-600 hover:text-yellow-900 p-1"
                           >
                             <Eye className="w-4 h-4" />
                           </button>
                           <button
                             onClick={() => {
                               setSelectedContact(contact);
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

          {!loading && filteredContacts.length === 0 && (
            <div className="p-8 text-center">
              <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No contact submissions found matching your criteria</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Contact Details Modal */}
      {showContactModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-lg font-semibold mb-4">Contact Details</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <p className="text-gray-900">{selectedContact.firstName} {selectedContact.lastName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <p className="text-gray-900">{selectedContact.email}</p>
              </div>
              {selectedContact.phone && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  <p className="text-gray-900">{selectedContact.phone}</p>
                </div>
              )}
              {selectedContact.company && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Company</label>
                  <p className="text-gray-900">{selectedContact.company}</p>
                </div>
              )}
              {selectedContact.website && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Website</label>
                  <a 
                    href={selectedContact.website.startsWith('http') ? selectedContact.website : `https://${selectedContact.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {selectedContact.website}
                  </a>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-gray-700">Revenue</label>
                <p className="text-gray-900">{formatRevenue(selectedContact.revenue)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Country</label>
                <p className="text-gray-900">{selectedContact.country}</p>
              </div>
              {selectedContact.message && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Message</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedContact.message}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-gray-700">Submitted</label>
                <p className="text-gray-900">{formatDate(selectedContact.created_at)}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowContactModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-lg font-semibold mb-4 text-red-600">Delete Contact</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the contact for <strong>{selectedContact.firstName} {selectedContact.lastName}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteContact(selectedContact.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </motion.div>
                 </div>
       )}

       {/* Email Modal */}
       {showEmailModal && selectedContact && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
           >
             <h3 className="text-lg font-semibold mb-4">Send Email to {selectedContact.firstName} {selectedContact.lastName}</h3>
             <div className="space-y-4">
               <div>
                 <label className="text-sm font-medium text-gray-700">To:</label>
                 <p className="text-gray-900">{selectedContact.email}</p>
               </div>
               <div>
                 <label className="text-sm font-medium text-gray-700">Subject:</label>
                 <input
                   type="text"
                   value={emailSubject}
                   onChange={(e) => setEmailSubject(e.target.value)}
                   className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                   placeholder="Enter email subject..."
                 />
               </div>
               <div>
                 <label className="text-sm font-medium text-gray-700">Message:</label>
                 <textarea
                   value={emailMessage}
                   onChange={(e) => setEmailMessage(e.target.value)}
                   rows={12}
                   className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                 onClick={() => sendEmail(selectedContact.id, selectedContact.email, emailSubject, emailMessage)}
                 disabled={sendingEmail || !emailSubject || !emailMessage}
                 className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
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

export default ContactsPage;
