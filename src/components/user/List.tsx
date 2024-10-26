import React from "react";
import { userData } from "../../models/user";

interface UserProp {
    users: userData[];
    remove: (id: string) => void;
    edit: (user: userData) => void;
}

export const UserList: React.FC<UserProp> = ({ users, remove, edit }) => {
    return (
        <table border={1}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                            <button onClick={() => remove(user.id)}>Remove</button>
                            <button onClick={() => edit(user)}>Edit</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
