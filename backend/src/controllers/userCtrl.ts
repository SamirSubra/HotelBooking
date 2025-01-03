import User from "../models/user";
import { Request, Response } from "express";
import * as fs from "fs";

const defaultProfileImg = "/users/uploads/default-profile-photo.jpg"

// **1. Get all users**
export const getAllUsers = (req: Request, res: Response) => {
    console.log("Fetching all users");
    User.find()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((error) => {
            console.error("Error fetching users:", error);
            res.status(400).json({ error });
        });
};

// **2. Create a user**
export const createUser = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, age, username, password } = req.body;

        // Handle profile photo upload
        const profilePhoto = req.file
            ? `/users/uploads/${req.file.filename}`
            : defaultProfileImg;

        const user = new User({
            firstName,
            lastName,
            age,
            username,
            password,
            profilePhoto,
        });

        await user.save();
        console.log("New user created:", user);
        res.status(201).json({ success: true, message: "User created successfully", user });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ success: false, error });
    }
};

// **3. Delete a user**
export const deleteUser = async (req: Request, res: Response) => {
    console.log("Deleting user");

    try {
        const user = await User.findOne({ _id: req.params.id });

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        // Delete the profile photo if it exists
        if (user.profilePhoto && user.profilePhoto !== defaultProfileImg) {
            const filename = user.profilePhoto.split("/users/uploads/")[1];
            fs.unlink(`backend/images/${filename}`, (err) => {
                if (err) {
                    console.error(`Failed to delete file ${filename}:`, err);
                }
            });
        }

        // Delete the user
        await User.deleteOne({ _id: req.params.id });

        res.status(200).json({ message: "User deleted!" });
        console.log("User deleted");
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error });
    }
};


// **4. Get a user by ID**
export const getUser = (req: Request, res: Response) => {
    console.log("Fetching user");
    User.findOne({ _id: req.params.id })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: "User not found!" });
            }
            res.status(200).json(user);
            console.log("User fetched:", user);
        })
        .catch((error) => {
            console.error("Error fetching user:", error);
            res.status(404).json({ error });
        });
};

// **5. Update a user**
export const modifyUser = async (req: Request, res: Response) => {
    console.log("Modifying user");
    try {
        const { firstName, lastName, age, username, password } = req.body;

        // Handle new profile photo upload
        let profilePhoto = req.body.profilePhoto; // Retain the old photo if no new one is provided
        if (req.file) {
            profilePhoto = `/users/uploads/${req.file.filename}`;

            // Delete the old profile photo if it exists
            const oldUser = await User.findOne({ _id: req.params.id });
            if (oldUser && oldUser.profilePhoto !== defaultProfileImg) {
                const filename = oldUser.profilePhoto.split("/users/uploads/")[1];
                fs.unlink(`backend/images/${filename}`, (err) => {
                    if (err) {
                        console.error(`Failed to delete file ${filename}:`, err);
                    }
                });
            }
        }

        // Update user details
        const updatedUser = await User.updateOne(
            { _id: req.params.id },
            { firstName, lastName, age, username, password, profilePhoto }
        );

        console.log("User modified:", updatedUser);
        res.status(200).json({ success: true, message: "User modified successfully" });
    } catch (error) {
        console.error("Error modifying user:", error);
        res.status(500).json({ success: false, error });
    }
};
