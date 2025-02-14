import React, { useState } from "react";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import { summary } from "../assets/data";
import { getInitials } from "../utils";
import clsx from "clsx";
import ConfirmatioDialog, { UserAction } from "../components/Dialogs";
import AddUser from "../components/AddUser";

const Users = () => {
  const [users, setUsers] = useState(summary.users); 
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  console.log("📌 Utilisateurs au rendu :", users);

  const addOrEditUser = (userData) => {
    console.log("📝 Fonction addOrEditUser appelée avec :", userData);

    if (selected) {
      setUsers(users.map((u) => (u._id === selected._id ? userData : u)));
      console.log("✏️ Modification de l'utilisateur :", selected);
    } else {
      const newUser = { ...userData, _id: Date.now().toString() };
      setUsers([...users, newUser]);
      console.log("✅ Nouvel utilisateur ajouté :", newUser);
    }
    
    setOpen(false);
    setSelected(null);
  };

  const deleteHandler = () => {
    console.log("🗑️ Suppression de l'utilisateur avec l'ID :", selected);
    setUsers(users.filter((u) => u._id !== selected));
    setOpenDialog(false);
  };

  const deleteClick = (id) => {
    console.log("⚠️ Clic sur le bouton DELETE - ID sélectionné :", id);
    setSelected(id);
    setOpenDialog(true);
  };

  const editClick = (el) => {
    console.log("✏️ Clic sur le bouton EDIT - Utilisateur sélectionné :", el);
    setSelected(el);
    setOpen(true);
  };

  return (
    <>
      <div className='w-full md:px-1 px-0 mb-6'>
        <div className='flex items-center justify-between mb-8'>
          <Title title='  Team Members' />
          <Button
            label='Add New User'
            icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md 2xl:py-2.5'
            onClick={() => {
              console.log("🟢 Bouton Add New User cliqué");
              setOpen(true);
            }}
          />
        </div>

        <div className='bg-white px-2 md:px-4 py-4 shadow-md rounded'>
          <div className='overflow-x-auto'>
            <table className='w-full mb-5'>
              <thead className='border-b border-gray-300'>
                <tr className='text-black text-left'>
                  <th className='py-2'>Full Name</th>
                  <th className='py-2'>Title</th>
                  <th className='py-2'>Email</th>
                  <th className='py-2'>Role</th>
                  <th className='py-2'>Active</th>
                  <th className='py-2'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
                    <td className='p-2'>
                      <div className='flex items-center gap-3'>
                        <div className='w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-blue-700'>
                          <span className='text-xs md:text-sm text-center'>
                            {getInitials(user.name)}
                          </span>
                        </div>
                        {user.name}
                      </div>
                    </td>
                    <td className='p-2'>{user.title}</td>
                    <td className='p-2'>{user.email || "user.emal.com"}</td>
                    <td className='p-2'>{user.role}</td>
                    <td>
                      <button className={clsx("w-fit px-4 py-1 rounded-full", user.isActive ? "bg-blue-200" : "bg-yellow-100")}>
                        {user.isActive ? "Active" : "Disabled"}
                      </button>
                    </td>
                    <td className='p-2 flex gap-4 justify-end'>
                      <Button
                        className='text-blue-600 hover:text-blue-500 font-semibold sm:px-0'
                        label='Edit'
                        type='button'
                        onClick={() => editClick(user)}
                      />
                      <Button
                        className='text-red-700 hover:text-red-500 font-semibold sm:px-0'
                        label='Delete'
                        type='button'
                        onClick={() => deleteClick(user._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddUser open={open} setOpen={setOpen} userData={selected} onSubmit={addOrEditUser} />
      <ConfirmatioDialog open={openDialog} setOpen={setOpenDialog} onClick={deleteHandler} />
    </>
  );
};

export default Users;
