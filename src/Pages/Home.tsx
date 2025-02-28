import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

function Home() {
    const [todos, setTodos] = useState<string[] | any>(JSON.parse(localStorage.getItem("todos")) || []);
    const [input, setInput] = useState<string>('');

    // Modal state for confirmation
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [todoToDelete, setTodoToDelete] = useState<number | null>(null);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (input.trim()) {
            setTodos([...todos, input]);
            setInput("");
            toast.success("The plan was saved successfully");
        } else {
            toast.error("Please enter a valid plan!");
        }
    };

    const handleDeleteTodo = (index: number) => {
        setTodoToDelete(index);  // Set the index of the todo to be deleted
        setIsModalOpen(true); // Open the modal
    };

    const confirmDelete = () => {
        if (todoToDelete !== null) {
            const updatedTodos = todos.filter((_, i) => i !== todoToDelete);
            setTodos(updatedTodos);
            setIsModalOpen(false);
            setTodoToDelete(null);
            toast.success("The plan was deleted successfully");
        }
    };

    const cancelDelete = () => {
        setIsModalOpen(false);
        setTodoToDelete(null);
        toast.info("The deletion was cancelled");
    };

    return (
        <div>
            <form className="flex items-center justify-center flex-col gap-3 py-5" onSubmit={handleAddTodo}>
                <textarea
                    required
                    className='border-2 placeholder:text-black p-1 rounded-lg min-w-80 min-h-32'
                    placeholder='Enter your plan'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button className="bg-blue-600 text-lg p-2 rounded-md text-white w-80 cursor-pointer">
                    Add
                </button>
            </form>

            <ul className="flex min-w-96 mx-auto rounded-xl items-center justify-center flex-col gap-16">
                {todos.map((todo, index) => (
                    <li key={index} className="py-2 rounded-2xl max-w-fit p-20 list-none flex bg-white items-center justify-between gap-20">
                        {todo}
                        <button
                            onClick={() => handleDeleteTodo(index)}
                            className='bg-red-600 gap-2 flex items-center text-white p-1 rounded-md cursor-pointer'
                        >
                            Delete <FaTrash />
                        </button>
                    </li>
                ))}
            </ul>
            {isModalOpen && (
                <div key="modal" className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
                        <h3 className="mb-4 text-xl">Are you sure you want to delete this task?</h3>
                        <div className="flex justify-between">
                            <button
                                className="bg-red-500 cursor-pointer text-white py-2 px-4 rounded-md"
                                onClick={confirmDelete}
                            >
                                Yes, Delete
                            </button>
                            <button
                                className="bg-gray-300 cursor-pointer py-2 px-4 rounded-md"
                                onClick={cancelDelete}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
