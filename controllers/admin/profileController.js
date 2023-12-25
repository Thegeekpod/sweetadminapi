import Admin from "../../models/admin/adminModel.js";

export const viewProfile = async (req, res) => {
  try {
    const adminId = req.adminId; // Extracted from JWT verification
    const admin = await Admin.getAdminById(adminId);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    // Omit sensitive data if needed before sending the response
    const { password, ...profileDetails } = admin;
    res.json(profileDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
