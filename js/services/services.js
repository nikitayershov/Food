const postData = async (url, data) => { // async ставится перед функцией
    const res = await fetch(url, { // await ставится перед операциями, которые необходимо дождаться
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

const getResource = async (url) => { // async ставится перед функцией
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};

export {postData};
export {getResource};