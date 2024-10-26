import React, { useEffect, useState } from "react"
import { userData } from "../../models/user"
import { addUser, deleteUser, editUser, getUserBySearching } from "../../services/user"
import { UserList } from "../../components/user/List";

export const UserCreate: React.FC = () => {
    const [id, setId] = useState<string>('');
    const [name, setName] = useState<string>(''); 
    const [email, setEmail] = useState<string | ''>('');
    const [password, setPassword] = useState<string | ''>('');
    const [btn, setBtn] = useState<string | ''>('Add');
    const [searchname, setSearchName] = useState<string>('');

    const [users, setUsers] = useState<userData[]>([]); 

    const handleAddUser = async() => {
            let newUser : userData = {id: '', name, email, password};

            const userId = await addUser(newUser);
           if (userId == null) {
            alert('User cannot be added');
           } else {
            alert ('User was added successfully');
            newUser.id = userId;
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
        setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
            alert('User deleted successfully');
    }

    const handleEditClick = (user : userData) => {
        setId(user.id);
        setName(user.name);
        setEmail(user.email);
        setBtn('Update');
    };

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
            <UserList users={users} remove={handleRemoveUser} edit={handleEditClick}/>

        </>
    );
};
