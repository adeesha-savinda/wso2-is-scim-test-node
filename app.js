import axios from 'axios';

const SERVER_HOST = 'localhost';    // WSO2 IS Host
const SERVER_PORT = '9443';         // WSO2 IS Port
const BASE_URL = `https://${SERVER_HOST}:${SERVER_PORT}`; // WSO2 IS Base URL
const SCIM2_URL = `${BASE_URL}/scim2`;

const URL = `${SCIM2_URL}/Users`;  // SCIM 2.0 Users URL

const getAllUsers = async () => {
    // axios.get(url, config)
    let response = await axios.get(URL, {
        auth: { username: 'admin', password: 'admin' },
        params: {'startIndex': 1,'count': 3}
    });

    console.log('\n\nFirst 3 available users: \n', response.data);
    console.log('\n===========================================\n');
};

const createUser = async () => {

    const user = {
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
        phoneNumbers: [
            {
                value: "94763540500",
                type: "mobile"
            }
        ],
    }

    // axios.post(url, data, config)
    let response = await axios.post(URL, user, {
        // config
        headers: {
            'Content-Type': 'application/json',
        },
        auth: { username: 'admin', password: 'admin' },
    });

    console.log('User created: \n', response.data);
    console.log('\n===========================================\n');

    return response.data.id;;
}

const getUser = async (userId) => {
    let response = await axios.get(`${URL}/${userId}`, {
        auth: { username: 'admin', password: 'admin' }
    });

    let user = response.data;

    console.log('User: \n', user);
    console.log('\n===========================================\n');
};

const updateUser = async (userId) => {
    // axios.put(url, data, config)
    let response = await axios.put(`${URL}/${userId}`, {
        userName: "thor",
        // change the username from thor to thor123
        name: { givenName: "thor123" },
    }, {
        headers: {
            'Content-Type': 'application/json',
        },
        auth: { username: 'admin', password: 'admin' },
    });

    const user = response.data;

    console.log('Updated user: \n', user);
    console.log('\n===========================================\n');
};

const deleteUser = async (userId) => {
    const response = await axios.delete(`${URL}/${userId}`, {
        headers: {
            'Accept': 'application/scim+json',
        },
        auth: { username: 'admin', password: 'admin' },
    })

    console.log('User deleted: \n', response.status === 204);
    console.log('\n===========================================\n');
};

const fn = async () => {

    let id = '';

    try {
        // GET - get all users
        await getAllUsers();

        // POST - create a user
        id = await createUser();

        // GET - get created user by ID
        await getUser(id);

        // PUT - update previously created user
        await updateUser(id);

    } catch (error) {
        console.log('********************');
        console.log(error.message);
    } finally {
        try {
            // DELETE - delete the created user if exists
            await deleteUser(id);
        } catch (error) {
            console.log('********************');
            console.log(error);
        }
    }
}

// Use this function to test out any requirement
const test = async () => {
    try {
        // Change Password flow
        const response = await axios.patch(`${SCIM2_URL}/Me`, {
            Operations: [
                {
                    op: "add",
                    value: {
                        "password": "123Tony$"
                    }
                }
            ],
            schemas: [
                "urn:ietf:params:scim:api:messages:2.0:PatchOp"
            ]
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
            auth: { username: 'tony', password: '123tony4' },
        });
    
        console.log('Changed Password of User: \n', response.data);

    } catch (error) {
        console.log('********************');
        console.log(error.message);
    } 
}

// test();
fn();
