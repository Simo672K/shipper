import { Request, Response, NextFunction } from "express"; // Import required types

function roleMiddleware(roles: any) {
  // Use array for multiple roles
  return (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    const user = req.user;

    // Check if user is present and authorized
    if (!user || !roles.includes(user.role)) {
      return res.status(403).send("Unauthorized");
    }

    next(); // Pass control to the next middleware or route handler
  };
}

export default roleMiddleware; // Export for use in your Express application
