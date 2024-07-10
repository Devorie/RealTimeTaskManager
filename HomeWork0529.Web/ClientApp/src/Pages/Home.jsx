import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();
    const [taskItem, setTaskItem] = useState('');
    const [allTasks, setAllTasks] = useState([]);

    const connectionRef = useRef();

    useEffect(() => {
        const connectToHub = async () => {

            const loadTasks = async () => {
                const { data } = await axios.get('/api/taskitems/getall');
                setAllTasks(data);
            }

            const connection = new HubConnectionBuilder().withUrl("/api/taksitem").build();
            await connection.start();
            connectionRef.current = connection;

            connection.on('newTaskReceived', item => {
                setAllMessages(items => [...items, item]);
            });

            connection.on('completedtask', id => {
                setAllMessages(items => items.filter(i => i.id !== id));
            });

            connection.on('statusUpdate', s, userId, id => {
                setAllMessages(items => items.map(item =>
                    item.id === id ? { ...item, status: s, userId } : item
                ))});
        }
        loadTasks();
        connectToHub();
    }, []);

    const onAddClick = async () => {
        await axios.post('/api/taskitem/add', taskItem);
        setTaskItem('');
    }

    const onUpdateStatusClick = async (id) => {
        await axios.post('/api/taskitem/updatestatus');
    }

    const onCompleteClick = async (id) => {
        await axios.post('/api/taskitem/completetask');
    }

    const getButton = (t) => {
        if (t.status == null) {
            return <button className="btn btn-dark mt-auto" onClick={() => onUpdateStatusClick(t.id)}>I'm doing this one!</button>
        }
        if (t.userId == ) {
            return <button className="btn btn-success mt-auto" onClick={() => onCompleteClick(t.id)}>I'm done!</button>
        }
        return <button disabled className="btn btn-secondary mt-auto">{t.status}</button>
    }
    
    return (
        <div style={{ marginTop: 80 }}>
            <div className='row'>
                <div className='col-md-10'>
                    <input value={text} onChange={e => setTaskItem(e.target.value)} type='text' className='form-control form-control-lg' placeholder='Type a new task here...' />
                </div>
                <div className='col-md-2'>
                    <button className='btn btn-outline-success btn-lg w-100' onClick={onAddClick}>Add</button>
                </div>
            </div>
            <table className='table table-hover table-striped table-bordered mt-5'>
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {allTasks.map(t => <tr key={t.id}>
                        <td>{t.title}</td>
                        <td>{getButton(t)}</td>
                    </tr>)}
                </tbody>
            </table>
            
        </div>
    );
};

export default Home;