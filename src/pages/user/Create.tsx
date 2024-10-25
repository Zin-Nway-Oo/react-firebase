import React, { useEffect, useState } from "react"
import { userData } from "../../models/user"
import { addUser, deleteUser, editUser, getUserBySearching } from "../../services/user"

export const UserCreate: React.FC = () => {
    const [id, setId] = useState<string>('');
    const [name, setName] = useState<string>(''); // Specify string type for `name`
    const [email, setEmail] = useState<string | ''>(''); // `email` as number or empty string for initial state
    const [password, setPassword] = useState<string | ''>(''); // `password` as number or empty string for initial state
    const [btn, setBtn] = useState<string | ''>('Add');
    const [searchname, setSearchName] = useState<string>(''); // Specify string type for `name`

    const [users, setUsers] = useState<userData[]>([]); 

    const handleAddUser = async() => {
            const newUser : userData = {id: '', name, email, password};

            const userId = await addUser(newUser);
           if (userId == null) {
            alert('User cannot be added');
           } else {
            alert ('User was added successfully');
            newUser.id = userId;
            setUsers((prevUsers) => [...prevUsers,newUser]);
            handleClear();
           }
    };

    const handleEditUser = async() => {
        const updatedUser : Partial<userData> = {name, email, password};
        const response = await editUser(id, updatedUser);
        if (response) {
            alert(`User with ID ${id} has been updated.`);
        } else {
            alert(`Failed to update user with ID ${id}.`);
        }
        handleClear();
    }

    const handleClear = () => {
        setName('');
        setEmail('');
        setPassword('');
        setId('');
        setBtn('Add');
    }

    const handleRemoveUser = async(id : string) => {
        await deleteUser(id);
        setUsers((prevUsers) => prevUsers.filter(user => user.id !== id)); // Update state to remove the deleted user
            alert('User deleted successfully');
    }

    const fetchUsers = async () => {
        const fetchedUsers = await getUserBySearching(searchname);
        setUsers(fetchedUsers);
    };



    useEffect(() => {    
        fetchUsers();
    }, [users]);

    return (
        <>
            <h1>User Registration</h1>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
             <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={() => {
                if (btn == 'Add' && id == '') {
                    handleAddUser();
                } else {
                    handleEditUser();
                }
            }}>{btn}</button>

            <hr/>

            {/* Displaying the list of users */}
            <input
                type="text"
                placeholder="serch by name"
                value={searchname}
                onChange={(e) => {
                    setSearchName(e.target.value);
                }}
            />
            <table border={1}>
                <thead>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th></th>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button
                                    onClick={() => handleRemoveUser(user.id)}
                                >Remove</button>
                                 <button
                                    onClick={() => {
                                        setId(user.id);
                                        setName(user.name);
                                        setEmail(user.email);
                                        setBtn('Update');
                                    }}
                                >Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </>
    );
};
