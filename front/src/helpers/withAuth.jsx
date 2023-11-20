import axios from 'axios';
import React, { Component } from 'react';

import { useNavigate } from "react-router-dom";
export default function withAuth(ComponentToProtect) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  return class extends Component {
    
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }
    componentDidMount() {
        try {
            axios.get("http://localhost:5000/api/secret").then(res=>{
                if (res.status === 200) {
                    this.setState({ loading: false });
                  } else {
                    this.setState({ loading: true });
                    const error = new Error(res.error);
                    throw error;
                  }
            });
          } catch (error) {
            this.setState({ loading: true });
            alert(error);
          }
    }
    
    render() {
      const { loading, redirect } = this.state;
      
      if (loading) {
        return null;
      }
      console.log("nao ta funfaando")
      if (redirect) {
        console.log("aaaaaaaaaaaaa")
        return window.location.href = "http://localhost:3000/login";
      }
      return <ComponentToProtect {...this.props} />;
    }
  }
}