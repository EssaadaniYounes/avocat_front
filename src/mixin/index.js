import axios from 'axios';

const request_header =
{
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('user_token')
}
const domaine = "http://127.0.0.1:8000/api/";

export default {
    methods: {
        async api(request, method , data ) {
            
            data = !data ? {} : data;
            method = !method ? "get" : method;

            return await axios({
                method: method,
                url: domaine + request,
                data: data,
                headers: request_header
            })
        }
    }
}