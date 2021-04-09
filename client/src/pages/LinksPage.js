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

    useEffect(() => {
        fetchLinks();
    }, [fetchLinks]);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            {!loading && <LinksList links={links} />}
        </>
    );
};
