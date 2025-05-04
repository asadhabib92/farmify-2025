
import React, { useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Eye, 
  FileText, 
  User, 
  MapPin,
  Phone,
  Mail,
  Calendar
} from 'lucide-react';

// Sample farmer applications data
const initialApplications = [
  { 
    id: "APP-001", 
    name: "Rajesh Patel", 
    location: "Nashik, Maharashtra", 
    phone: "+91 98765 43210",
    email: "rajesh@example.com",
    farmName: "Green Fields Farm",
    farmSize: "5 acres",
    products: "Rice, Wheat, Vegetables",
    appliedDate: "2023-10-10",
    status: "pending",
    documents: {
      aadhar: true,
      pan: true,
      farmProof: true
    }
  },
  { 
    id: "APP-002", 
    name: "Meena Kumari", 
    location: "Coimbatore, Tamil Nadu", 
    phone: "+91 87654 32109",
    email: "meena@example.com",
    farmName: "Organic Bliss",
    farmSize: "3.5 acres",
    products: "Fruits, Spices",
    appliedDate: "2023-10-12",
    status: "pending",
    documents: {
      aadhar: true,
      pan: true,
      farmProof: false
    }
  },
  { 
    id: "APP-003", 
    name: "Surinder Singh", 
    location: "Amritsar, Punjab", 
    phone: "+91 76543 21098",
    email: "surinder@example.com",
    farmName: "Punjab Organics",
    farmSize: "15 acres",
    products: "Wheat, Rice, Pulses",
    appliedDate: "2023-10-15",
    status: "pending",
    documents: {
      aadhar: true,
      pan: true,
      farmProof: true
    }
  },
  { 
    id: "APP-004", 
    name: "Lakshmi Reddy", 
    location: "Guntur, Andhra Pradesh", 
    phone: "+91 65432 10987",
    email: "lakshmi@example.com",
    farmName: "Sunrise Farms",
    farmSize: "8 acres",
    products: "Rice, Chilies, Vegetables",
    appliedDate: "2023-10-18",
    status: "pending",
    documents: {
      aadhar: true,
      pan: true,
      farmProof: true
    }
  }
];

// Sample past applications
const pastApplications = [
  { 
    id: "APP-005", 
    name: "Arvind Sharma", 
    location: "Jaipur, Rajasthan", 
    appliedDate: "2023-09-05",
    status: "approved",
    approvedDate: "2023-09-08"
  },
  { 
    id: "APP-006", 
    name: "Kavita Devi", 
    location: "Lucknow, Uttar Pradesh", 
    appliedDate: "2023-09-10",
    status: "rejected",
    rejectedDate: "2023-09-12",
    reason: "Incomplete documentation"
  },
  { 
    id: "APP-007", 
    name: "Mohammad Hussain", 
    location: "Bhopal, Madhya Pradesh", 
    appliedDate: "2023-09-15",
    status: "approved",
    approvedDate: "2023-09-18"
  }
];

const ApproveApplications = () => {
  const [applications, setApplications] = useState(initialApplications);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectionDialogOpen, setRejectionDialogOpen] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<"approve" | "reject">("approve");

  const handleViewDetails = (application: any) => {
    setSelectedApplication(application);
    setViewDetailsOpen(true);
  };

  const handleApprove = (applicationId: string) => {
    setApplications(applications.filter(app => app.id !== applicationId));
    // In a real app, you would update the status in the database
  };

  const handleReject = (applicationId: string) => {
    setRejectionReason("");
    setActionType("reject");
    setSelectedApplication(applications.find(app => app.id === applicationId));
    setRejectionDialogOpen(true);
  };

  const confirmReject = () => {
    setApplications(applications.filter(app => app.id !== selectedApplication?.id));
    setRejectionDialogOpen(false);
    // In a real app, you would update the status and reason in the database
  };

  const openConfirmationDialog = (application: any, type: "approve" | "reject") => {
    setSelectedApplication(application);
    setActionType(type);
    setConfirmationDialogOpen(true);
  };

  const handleConfirmAction = () => {
    if (actionType === "approve") {
      handleApprove(selectedApplication.id);
    } else if (actionType === "reject") {
      setRejectionDialogOpen(true);
    }
    setConfirmationDialogOpen(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Farmer Applications</h1>
          <p className="text-gray-500">Review and process new farmer applications</p>
        </div>

        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending">Pending ({applications.length})</TabsTrigger>
            <TabsTrigger value="processed">Processed ({pastApplications.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Applications</CardTitle>
              </CardHeader>
              <CardContent>
                {applications.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Farmer Name</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Applied On</TableHead>
                        <TableHead>Documents</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {applications.map((application) => (
                        <TableRow key={application.id}>
                          <TableCell>{application.id}</TableCell>
                          <TableCell>{application.name}</TableCell>
                          <TableCell>{application.location}</TableCell>
                          <TableCell>{application.appliedDate}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <span className={`w-2 h-2 rounded-full ${application.documents.aadhar ? 'bg-green-500' : 'bg-red-500'}`}></span>
                              <span className="text-xs">Aadhar</span>
                              
                              <span className={`ml-2 w-2 h-2 rounded-full ${application.documents.pan ? 'bg-green-500' : 'bg-red-500'}`}></span>
                              <span className="text-xs">PAN</span>
                              
                              <span className={`ml-2 w-2 h-2 rounded-full ${application.documents.farmProof ? 'bg-green-500' : 'bg-red-500'}`}></span>
                              <span className="text-xs">Farm Proof</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => handleViewDetails(application)}
                              >
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View details</span>
                              </Button>
                              
                              <Button 
                                size="sm" 
                                className="h-8 w-8 p-0 bg-green-600 hover:bg-green-700"
                                onClick={() => openConfirmationDialog(application, "approve")}
                              >
                                <CheckCircle className="h-4 w-4" />
                                <span className="sr-only">Approve</span>
                              </Button>
                              
                              <Button 
                                size="sm" 
                                className="h-8 w-8 p-0 bg-red-600 hover:bg-red-700"
                                onClick={() => openConfirmationDialog(application, "reject")}
                              >
                                <XCircle className="h-4 w-4" />
                                <span className="sr-only">Reject</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium">No pending applications</h3>
                    <p className="mt-1 text-gray-500">There are no pending farmer applications to review</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="processed">
            <Card>
              <CardHeader>
                <CardTitle>Processed Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Farmer Name</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Applied On</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Decision Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pastApplications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell>{application.id}</TableCell>
                        <TableCell>{application.name}</TableCell>
                        <TableCell>{application.location}</TableCell>
                        <TableCell>{application.appliedDate}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            application.status === "approved" 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {application.status === "approved" ? 'Approved' : 'Rejected'}
                          </span>
                        </TableCell>
                        <TableCell>{application.status === "approved" ? application.approvedDate : application.rejectedDate}</TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 w-8 p-0"
                            onClick={() => handleViewDetails(application)}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View details</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* View Details Dialog */}
      <Dialog open={viewDetailsOpen} onOpenChange={setViewDetailsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>
              Review farmer application information
            </DialogDescription>
          </DialogHeader>
          
          {selectedApplication && (
            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="font-semibold">Name:</span>
                  <span>{selectedApplication.name}</span>
                </div>
                
                {selectedApplication.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="font-semibold">Phone:</span>
                    <span>{selectedApplication.phone}</span>
                  </div>
                )}
                
                {selectedApplication.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="font-semibold">Email:</span>
                    <span>{selectedApplication.email}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="font-semibold">Location:</span>
                  <span>{selectedApplication.location}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="font-semibold">Applied on:</span>
                  <span>{selectedApplication.appliedDate}</span>
                </div>
              </div>
              
              {selectedApplication.farmName && (
                <div className="border-t pt-4">
                  <h4 className="text-sm font-semibold mb-2">Farm Details</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Farm Name:</span> {selectedApplication.farmName}</p>
                    <p><span className="font-medium">Farm Size:</span> {selectedApplication.farmSize}</p>
                    <p><span className="font-medium">Products:</span> {selectedApplication.products}</p>
                  </div>
                </div>
              )}
              
              {selectedApplication.documents && (
                <div className="border-t pt-4">
                  <h4 className="text-sm font-semibold mb-2">Documents</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span>Aadhar Card</span>
                      {selectedApplication.documents.aadhar ? (
                        <span className="ml-auto text-green-600">Verified</span>
                      ) : (
                        <span className="ml-auto text-red-600">Missing</span>
                      )}
                    </li>
                    
                    <li className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span>PAN Card</span>
                      {selectedApplication.documents.pan ? (
                        <span className="ml-auto text-green-600">Verified</span>
                      ) : (
                        <span className="ml-auto text-red-600">Missing</span>
                      )}
                    </li>
                    
                    <li className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span>Farm Ownership Proof</span>
                      {selectedApplication.documents.farmProof ? (
                        <span className="ml-auto text-green-600">Verified</span>
                      ) : (
                        <span className="ml-auto text-red-600">Missing</span>
                      )}
                    </li>
                  </ul>
                </div>
              )}
              
              {selectedApplication.status === "rejected" && selectedApplication.reason && (
                <div className="border-t pt-4">
                  <h4 className="text-sm font-semibold mb-2">Rejection Reason</h4>
                  <p className="text-sm text-red-600">{selectedApplication.reason}</p>
                </div>
              )}
              
              {selectedApplication.status === "pending" && (
                <div className="flex justify-end gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setViewDetailsOpen(false);
                      openConfirmationDialog(selectedApplication, "reject");
                    }}
                  >
                    Reject
                  </Button>
                  <Button 
                    className="bg-farmify-green hover:bg-farmify-green-dark"
                    onClick={() => {
                      setViewDetailsOpen(false);
                      openConfirmationDialog(selectedApplication, "approve");
                    }}
                  >
                    Approve
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Confirmation Dialog */}
      <Dialog open={confirmationDialogOpen} onOpenChange={setConfirmationDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {actionType === "approve" ? "Approve Application" : "Reject Application"}
            </DialogTitle>
            <DialogDescription>
              {actionType === "approve" 
                ? "Are you sure you want to approve this farmer application? This will grant the farmer access to sell their products on the platform."
                : "Are you sure you want to reject this farmer application?"
              }
            </DialogDescription>
          </DialogHeader>
          
          {selectedApplication && (
            <div className="space-y-4">
              <div className="flex flex-col gap-1.5 p-4 rounded-md bg-gray-50">
                <p className="text-sm"><span className="font-semibold">ID:</span> {selectedApplication.id}</p>
                <p className="text-sm"><span className="font-semibold">Name:</span> {selectedApplication.name}</p>
                <p className="text-sm"><span className="font-semibold">Location:</span> {selectedApplication.location}</p>
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setConfirmationDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className={actionType === "approve" ? "bg-farmify-green hover:bg-farmify-green-dark" : "bg-red-600 hover:bg-red-700"}
                  onClick={handleConfirmAction}
                >
                  {actionType === "approve" ? "Yes, Approve" : "Yes, Reject"}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Rejection Reason Dialog */}
      <Dialog open={rejectionDialogOpen} onOpenChange={setRejectionDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Provide Rejection Reason</DialogTitle>
            <DialogDescription>
              Please specify a reason for rejecting this application. This information will be sent to the applicant.
            </DialogDescription>
          </DialogHeader>
          
          {selectedApplication && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="rejectionReason" className="block text-sm font-medium">Rejection Reason</label>
                <textarea 
                  id="rejectionReason"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g., Incomplete documentation, unable to verify farm ownership, etc."
                  rows={3}
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                />
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setRejectionDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-red-600 hover:bg-red-700"
                  disabled={!rejectionReason.trim()}
                  onClick={confirmReject}
                >
                  Reject Application
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default ApproveApplications;
