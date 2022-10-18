export function get<T = any>(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
        fetch(getUrl(url))
            .then(response => response.json())
            .then((data: T) => resolve(data))
            .catch((error: any) => reject(error))
    })
}

export function post<T = any>(url: string, data: any): Promise<T> {
    // Default options are marked with *
    const isFormData = data instanceof FormData
    const headers: any = { }
    if (!isFormData) {
        headers['Content-Type'] = 'application/json'
    }

    return new Promise((resolve, reject) => {
        fetch(getUrl(url), {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: headers,
            // 'Content-Type': isFormData ? 'application/x-www-form-urlencoded' : 'application/json'
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: isFormData ? data : JSON.stringify(data) // body data type must match "Content-Type" header
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                else reject(response)
            })
            .then((data: T) => resolve(data))
            .catch((error: any) => reject(error))
    })
}

export function put<T = any>(url: string, data: any): Promise<T> {
    // Default options are marked with *
    const isFormData = data instanceof FormData
    const headers: any = { }
    if (!isFormData) {
        headers['Content-Type'] = 'application/json'
    }

    return new Promise((resolve, reject) => {
        fetch(getUrl(url), {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: headers,
            // 'Content-Type': isFormData ? 'application/x-www-form-urlencoded' : 'application/json'
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: isFormData ? data : JSON.stringify(data) // body data type must match "Content-Type" header
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                else reject(response)
            })
            .then((data: T) => resolve(data))
            .catch((error: any) => reject(error))
    })
}

function getUrl(url: string): string {
    // return `http://172.20.10.4:3000/api/${url}`
    return `http://localhost:3000/api/${url}`
}
