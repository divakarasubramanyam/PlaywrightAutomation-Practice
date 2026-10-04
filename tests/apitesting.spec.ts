import {test, expect} from '@playwright/test';

test('Get Users API', async({request}) => {

    const response = await request.get('https://reqres.in/api/users?page=2');
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log('Response Body:', responseBody);
    expect(responseBody.data.length).toBeGreaterThan(0);
});

test('Create User API', async({request}) => {

    const requestBody = {
        name: 'Johncena',
        job: 'WWE Wrestler'
    }; 

    const response = await request.post('https://reqres.in/api/users', {
        data: requestBody
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    console.log('Response Body:', responseBody);
    expect(responseBody.name).toBe(requestBody.name);
    expect(responseBody.job).toBe(requestBody.job);
});

test('Create User with Headers', async({request}) => {

    const requestBody = {
        name: 'Johncena',
        job: 'WWE Wrestler'
    };

    const response = await request.post('https://reqres.in/api/users', {    
        headers: {
            'Content-Type': 'application/json',
            //'Authorization': 'Bearer token_here',
            //'x-api-key': 'your_api_key_here'
        },
        data: requestBody
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    console.log('Response Body:', responseBody);
    expect(responseBody.name).toBe(requestBody.name);
    expect(responseBody.job).toBe(requestBody.job);
});

test('Create User with Query Parameters', async({request}) => {

    const requestBody = {
        name: 'Johncena',
        job: 'WWE Wrestler'
    };

    const response = await request.post('https://reqres.in/api/users?version=1.0&env=production', {
        headers: {
            'Content-Type': 'application/json'
        },
        data: requestBody
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    console.log('Response Body:', responseBody);
    expect(responseBody.name).toBe(requestBody.name);
    expect(responseBody.job).toBe(requestBody.job);
});

test('Update User', async({request}) => {

    const userId = 2;
    const requestBody = {
        name: 'Johncena',
        job: 'WWE Wrestler'
    };

    const response = await request.put(`https://reqres.in/api/users/${userId}`, {
        data: requestBody
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log('Response Body:', responseBody);
    expect(responseBody.name).toBe(requestBody.name);
    expect(responseBody.job).toBe(requestBody.job);
});

test('Partial Update User', async({request}) => {

    const userId = 2;
    const requestBody = {
        job: 'WWE Champion'
    };
    const response = await request.patch(`https://reqres.in/api/users/${userId}`, {
        data: requestBody
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log('Response Body:', responseBody);
    expect(responseBody.job).toBe(requestBody.job);
});

test('Delete User', async({request}) => {

    const userId = 2;
    const response = await request.delete(`https://reqres.in/api/users/${userId}`);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(204);
    console.log('User deleted successfully');
});
