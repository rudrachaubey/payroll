import React, { useState, ChangeEvent, FormEvent } from 'react';
//import { Upload } from 'lucide-react';
//import { Alert, AlertDescription } from '@/components/ui/alert';
export interface FormData {
    fullName: string;
    email: string;
    phone: string;
    experience: string;
    currentSalary: string;
    expectedSalary: string;
    techStack: string[];
    resume: File | null;
    coverLetter: File | null;
  }
  
  export interface SubmitStatus {
    type: 'success' | 'error' | '';
    message: string;
  }
const ResumeUploadForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    currentSalary: '',
    expectedSalary: '',
    techStack: [],
    resume: null,
    coverLetter: null
  });

  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({ 
    type: '', 
    message: '' 
  });

  const techOptions: string[] = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'React', 
    'Node.js', 'AWS', 'Docker', 'Kubernetes', 'SQL', 'NoSQL'
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, files } = e.target;
    if (files && files[0]) {
      // Check file size (5MB limit)
      if (files[0].size > 5 * 1024 * 1024) {
        setSubmitStatus({
          type: 'error',
          message: 'File size should be less than 5MB'
        });
        return;
      }
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleTechStackChange = (tech: string): void => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.includes(tech)
        ? prev.techStack.filter(t => t !== tech)
        : [...prev.techStack, tech]
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.resume) {
      setSubmitStatus({
        type: 'error',
        message: 'Please fill in all required fields and upload a resume'
      });
      return;
    }

    try {
        // ------> api call for sending the data
      console.log('Form submitted:', formData);
      setSubmitStatus({
        type: 'success',
        message: 'Application submitted successfully!'
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to submit application. Please try again.'
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Submit Your Application</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Experience and Salary */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Years of Experience
            </label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              min="0"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Salary
            </label>
            <input
              type="number"
              name="currentSalary"
              value={formData.currentSalary}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tech Stack
          </label>
          <div className="flex flex-wrap gap-2">
            {techOptions.map(tech => (
              <button
                key={tech}
                type="button"
                onClick={() => handleTechStackChange(tech)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                  formData.techStack.includes(tech)
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* File Uploads */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Resume (PDF, DOC, DOCX) *
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="file"
                name="resume"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx"
                className="hidden"
                id="resume"
                required
              />
              <label
                htmlFor="resume"
                className="flex items-center px-4 py-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 transition-colors duration-200"
              >
                <div className="w-4 h-4 mr-2" />
                Upload Resume
              </label>
              {formData.resume && (
                <span className="text-sm text-gray-600">
                  {formData.resume.name}
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cover Letter (Optional)
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="file"
                name="coverLetter"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx"
                className="hidden"
                id="coverLetter"
              />
              <label
                htmlFor="coverLetter"
                className="flex items-center px-4 py-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 transition-colors duration-200"
              >
                <div className="w-4 h-4 mr-2" />
                Upload Cover Letter
              </label>
              {formData.coverLetter && (
                <span className="text-sm text-gray-600">
                  {formData.coverLetter.name}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Submit Application
        </button>

        {/* Status Messages */}
        {/* {submitStatus.message && (
          <Alert className={`${
            submitStatus.type === 'error' ? 'bg-red-50' : 'bg-green-50'
          }`}>
            <AlertDescription>
              {submitStatus.message}
            </AlertDescription>
          </Alert>
        )} */}
      </form>
    </div>
  );
};

export default ResumeUploadForm;