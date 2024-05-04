import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../context/axiosClient';
import LoadingSpinner from '../../components/ui/loading-spinner';
import './messages.css'; // Fichier CSS pour les styles

export default function Messages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await axiosClient.get("http://127.0.0.1:8000/api/message");
                setMessages(data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };
        fetchMessages();
    }, []);

    if (loading) return <LoadingSpinner />;

    return (
        <div className="messages-container">
            <h1 className="messages-title">Messages</h1>
            <ul className="message-list">
                {messages.slice(0).reverse().map((message, index) => (
                    <>
                    {new Date(message.created_at).toLocaleString()}
                    <li key={index} className="message-item">
                        
                        <Link to={`/dashboard/message/${message.id}`}>
                            <div className="message-content">
                                <span className="message-email">{message.email}</span>
                                <span className="message-text">{message.message}</span>
                            </div>
                        </Link>
                    </li></>
                    
                ))}
            </ul>
        </div>
    );
}
