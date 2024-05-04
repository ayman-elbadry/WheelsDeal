// MessageDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../../context/axiosClient';
import LoadingSpinner from '../../components/ui/loading-spinner';
import './messages.css'
export default function MessageDetail() {
    const { id } = useParams();
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const { data } = await axiosClient.get(`http://127.0.0.1:8000/api/message/${id}`);
                setMessage(data.data);
            } catch (error) {
                console.error("Error fetching message:", error);
            }
        };
        fetchMessage();
    }, [id]);

    if (!message) return <LoadingSpinner />;

    return (
        <div className="message-detail-container">
            <h2>Message Detail</h2>
            <div className="message-detail">
            <p className="message-detail-item"> {new Date(message.created_at).toLocaleString()}</p>
                <p className="message-detail-item"><strong>Name:</strong> {message.name}</p>
                <p className="message-detail-item"><strong>Email:</strong> {message.email}</p>
                <p className="message-detail-item"><strong>Subject:</strong> {message.subject}</p>
                <p className="message-detail-item"><strong>Message:</strong> {message.message}</p>
            </div>
        </div>
    );
}
