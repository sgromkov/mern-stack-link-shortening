import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useHttp } from '../hooks/http.hook';
import { useHistory } from 'react-router-dom';

export const CreatePage = () => {
    const history = useHistory();

    const auth = useContext(AuthContext);

    const { request } = useHttp();

    const [link, setLink] = useState('');

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const keyPressHandler = async (event) => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', { from: link }, {
                    Authorization: `Bearer ${auth.token}`
                });
                history.push(`/detail/${data.link._id}`);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
                <div className="input-field">
                    <input
                        placeholder="Вставьте ссылку"
                        id="link"
                        type="text"
                        value={link}
                        onChange={(event) => setLink(event.target.value)}
                        onKeyPress={keyPressHandler}
                    />
                    <label htmlFor="link">Введите ссылку</label>
                </div>
            </div>
        </div>
    );
};
