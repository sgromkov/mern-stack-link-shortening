import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/authContext';
import { Loader } from '../components/Loader';
import { LinksList } from '../components/LinksList';

export const LinksPage = () => {
    const [links, setLinks] = useState([]);

    const { loading, request } = useHttp();

    const { token } = useContext(AuthContext);

    const fetchLinks = useCallback(async () => {
        try {
            const response = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            });

            setLinks(response);
        } catch (error) {
            console.log(error);
        }
    }, [token, request]);

    const removeLinks = useCallback(async (id) => {
        try {
            await request('/api/link/delete', 'POST', { id }, {
                Authorization: `Bearer ${token}`
            });

            fetchLinks();
        } catch (error) {
            console.log(error);
        }
    }, [fetchLinks, request, token]);

    useEffect(() => {
        fetchLinks();
    }, [fetchLinks]);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            {!loading && <LinksList links={links} removeLinks={removeLinks} />}
        </>
    );
};
