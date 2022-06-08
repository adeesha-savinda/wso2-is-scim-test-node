import axios from 'axios';

const URL = 'https://localhost:9443/scim2/Users/';

const getAllUsers = async () => {
    // axios.get(url, config)
    let response = await axios.get(URL, {
        auth: { username: 'admin', password: 'admin' }
    });

    await console.log('All available users: \n', response.data);

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

    await console.log('User created: \n', response.data);

    return response.data.id;;
}

const getUser = async (userId) => {
    let response = await axios.get(`${URL}${userId}`, {
        auth: { username: 'admin', password: 'admin' }
    });

    let user = response.data;

    await console.log('User: \n', user);
};

const updateUser = async (userId) => {
    // axios.put(url, data, config)
    let response = await axios.put(`${URL}${userId}`, {
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
};

const deleteUser = async (userId) => {
    const response = await axios.delete(`https://localhost:9443/scim2/Users/${userId}`, {
        headers: {
            'Accept': 'application/scim+json',
        },
        auth: { username: 'admin', password: 'admin' },
    })

    console.log('User deleted: \n', response.status === 204);
};

const fn = async () => {

    let id = '';

    try {
        // GET - get all users
        await getAllUsers();

        // POST - create a user
        id = await createUser();

        // GET - get created user by ID
        // getUser(id);

        // PUT - update previously created user
        // updateUser(id);

    } catch (error) {
        console.log('********************');
        console.log(error.message);
    } finally {
        try {
            // DELETE - delete the created user if exists
            // deleteUser(id);
        } catch (error) {
            console.log('********************');
            console.log(error);
        }
    }
}

const test = async () => {
    // // GET - get created user by ID
    // const aaa = await axios.get(`https://localhost:9443/scim2/Users/d0eaf863-66bd-4827-8d1a-d70b0a82bbe5`, {
    //     auth: { username: 'admin', password: 'admin' }
    // });

    // await console.log('----------Peter: \n', aaa.data);

    // // GET - get all roles
    // const bbb = await axios.get(`https://localhost:9443/scim2/Roles?startIndex=1`, {
    //     auth: { username: 'admin', password: 'admin' }
    // });

    // await console.log('----------Roles: \n', bbb.data);

    // // GET - get all roles
    // const ccc = await axios.patch(`https://localhost:9443/scim2/Roles/7279a3fc-5889-44f8-a7a0-a76316cb2b24`, {
    //     Operations: [
    //         {
    //             op: "add",
    //             value: {
    //                 users: [
    //                     {
    //                         display: user.username,
    //                         value: user.id
    //                     }
    //                 ]
    //             }
    //         }
    //     ],
    //     schemas: [
    //         "urn:ietf:params:scim:api:messages:2.0:PatchOp"
    //     ]
    // }, {
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     auth: { username: 'admin', password: 'admin' },
    // });

    // await console.log('----------Roles added: \n', ccc.data);


    // GET
    const ddd = await axios.patch(`https://localhost:9443/scim2/Me`, {
        Operations: [
            {
                op: "add",
                value: {
                    "password": "Stark123$"
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
        auth: { username: 'tony', password: '123Tony$' },
    });

    await console.log('----------Roles added: \n', ddd.data);
}

// test();
fn();


// {"schemas":[],"name":{"familyName":"jackson","givenName":"kim"},"userName":"kim","password":"kimwso2","emails":[{"primary":true,"value":"kim.jackson@gmail.com","type":"home"},{"value":"kim_j@wso2.com","type":"work"}]}' --header "Content-Type:application/json"

