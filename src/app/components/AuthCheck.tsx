// components/AuthCheck.tsx
import {useEffect} from 'react';
import {showLoginAlert} from "@/app/components/LoginAlert";

export function AuthCheck() {
    useEffect(() => {
        const checkAuth = async () => {
            console.log(window.location.href)
            const response = await fetch(window.location.href);
            const authRequired = response.headers.get('x-auth-required');

            if (authRequired === 'true') {
                await showLoginAlert();
            }
        };

        checkAuth();
    }, []);

    return null;
}