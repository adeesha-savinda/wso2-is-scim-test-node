import axios from 'axios';

const fn = async () => {
    // create empty value for id
    let id = '';

    try {
        // GET - get all users
        // axios.get(url, config)
        let response = await axios.get('https://localhost:9443/scim2/Users/', {
            auth: { username: 'admin', password: 'admin' }
        });

        await console.log('All available users: \n', response.data);

        // POST - create a user
        // axios.post(url, data, config)
        response = await axios.post('https://localhost:9443/scim2/Users', {
            // data
            schemas: [],
            name: {
                familyName: "Odinson",
                givenName: "Thor",
            },
            userName: "thor",
            password: "123Thor$",
            emails: [{
                primary: true,
                value: "adeesha@wso2.com",
                type: "work"
            }],
        }, {
            // config
            headers: {
                'Content-Type': 'application/json',
            },
            auth: { username: 'admin', password: 'admin' },
        });

        id = response.data.id;

        await console.log('User created: \n', response.data);

        // GET - get created user by ID
        response = await axios.get(`https://localhost:9443/scim2/Users/${response.data.id}`, {
            auth: { username: 'admin', password: 'admin' }
        });

        let user = response.data;

        await console.log('Created User: \n', user);

        // PUT - update previously created user
        // axios.put(url, data, config)
        response = await axios.put(`https://localhost:9443/scim2/Users/${user.id}`, {
            userName: "thor",
            // change the username from thor to thor123
            name: { givenName: "thor123" },
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
            auth: { username: 'admin', password: 'admin' },
        });

        user = response.data;

        console.log('Edited user: \n', user);

    } catch (error) {
        console.log('********************');
        console.log(error);
    } finally {
        try {
            // DELETE - delete the created user if exists
            const response = await axios.delete(`https://localhost:9443/scim2/Users/${id}`, {
                headers: {
                    'Accept': 'application/scim+json',
                },
                auth: { username: 'admin', password: 'admin' },
            })

            console.log('User deleted: \n', response.status === 204);
        } catch (error) {
            console.log('********************');
            console.log(error);
        }
    }
}

fn();


// {"schemas":[],"name":{"familyName":"jackson","givenName":"kim"},"userName":"kim","password":"kimwso2","emails":[{"primary":true,"value":"kim.jackson@gmail.com","type":"home"},{"value":"kim_j@wso2.com","type":"work"}]}' --header "Content-Type:application/json"

