import React, {useEffect, useState} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';


const withErrorHandler = (WrappedComponent, axios) => {

    return props => {

    const [error, setError] = useState(null);

    const IntReq = axios.interceptors.request.use(req => {
            setError(null);
            return req;
        }
    );

    const IntRes = axios.interceptors.response.use(res => res, err => {
            setError(err)
        }
    );

    useEffect(() => {
        //cleanup work
        let isMounted = true;
        return () => {
            axios.interceptors.request.eject(IntReq);
            axios.interceptors.request.eject(IntRes);
            isMounted = false;
        }
    }, [IntReq, IntRes])    
        
    const errorConfirmedHandler = () => {
        setError(null)
    }

        // constructor(props){
        //     super(props);
        //     this.state = {
        //         error:null
        //     };
        //     this.IntReq = axios.interceptors.request.use(req => {
        //         this.setState({error: null});
        //         return req
        //     });
        //     this.IntRes = axios.interceptors.response.use(res => res, error => {
        //         this.setState({error: error})
        //         console.log(error.message)
        //     })
        // }

        return (
            <Aux>
                <Modal modalShow={error} modalClose={errorConfirmedHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props}/>
            </Aux>
        )
    }
}


export default withErrorHandler;