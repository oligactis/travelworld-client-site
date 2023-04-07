import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadString } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { initAuth } from '../Firebase/initAuth';

initAuth();

export const useFirebase = () => {
    const [user, setUser] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [admin, setAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const storage = getStorage();
    const auth = getAuth();

    // console.log(auth);

    const location = useLocation();
    const history = useHistory();
    // console.log(location);

    const redirect = () => {
        const { state } = location;
        (state?.from) ? history.push(state?.from?.pathname) : history.push('/')
    }

    const uploadAvatar = async (file) => {
        const fileRef = ref(storage, 'avatar/' + auth?.currentUser?.uid + '.png');
        setIsLoading(true);
        await uploadString(fileRef, file, 'data_url');
        const photoURL = await getDownloadURL(fileRef);
        updateProfile(auth?.currentUser, { photoURL })
            .then(() => { })
            .catch(e => { })
            .finally((result) => setUser({ ...user, photoURL }))
        setIsLoading(false);
    }

    const signWithGoogle = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        const googleProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleProvider)
            .then(result => {
                setUser(result.user)
                fetch(`${process.env.REACT_APP_BACKEND}/users`)
                    .then(res => res.json())
                    .then(data => {
                        const tmpData = data.find(item => item?.email === result?.user?.email)
                        if (!tmpData?.email)
                            saveUser(result?.user?.email, result?.user?.displayName, "POST")
                    })
                user && redirect()
            })
            .catch(error => setError('Something wrong with Google'))
            .finally(() => setIsLoading(false))
    }

    const signWithFacebook = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        const facebookProvider = new FacebookAuthProvider();
        signInWithPopup(auth, facebookProvider)
            .then(result => {
                setUser(result.user)
                user && redirect();
            })
            .catch(error => setError('Something wrong with Facebook'))
            .finally(() => {
                setIsLoading(false)
            })
    }

    const signInWithEmail = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                setUser(result.user)
                user && redirect();
            })
            .catch(error => setError("Incorrect Email and Password!"))
            .finally(() => setIsLoading(false))
    }

    const signUpWithEmail = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                setUser(result.user)
                saveUser(email, name, "POST");
                updateProfile(auth.currentUser, {
                    displayName: `${name && name}`,
                    photoURL: `${name && "/assets/img/avator.png"}`
                }).then(() => { }).catch(error => setError(error.message))
                user && redirect();
            })
            .catch(error => setError('Invalid Email and Password!'))
            .finally(() => setIsLoading(false))
    }

    const logOut = () => {
        setIsLoading(true);
        signOut(auth)
            .then(() => setUser({}))
        // .finally(() => setIsLoading(false))
        user && redirect();
    }

    const saveUser = (email, displayName, method) => {
        const tmpUser = { email, displayName }
        fetch(`${process.env.REACT_APP_BACKEND}/users`, {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(tmpUser)
        })
        //.then(data => console.log(data))
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND}/users/admin/${user?.email}`)
            .then(res => res.json())
            .then(data => setAdmin(data?.admin))
    }, [user])

    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
                if (location.pathname === '/login' || location.pathname === '/logout')
                    history.push('/');
            }
            else
                setUser({});
            setIsLoading(false);
        });
        return () => unsubscribed;
    }, [auth, history, location])

    // console.log(admin);

    return {
        auth,
        user,
        name,
        email,
        admin,
        error,
        logOut,
        setName,
        setEmail,
        password,
        isLoading,
        setPassword,
        uploadAvatar,
        signWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        signWithFacebook,
    }
}
