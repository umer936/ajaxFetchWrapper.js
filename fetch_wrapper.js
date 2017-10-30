let ajax = function (options) {
    let settings = {
        url: setDefaultVal(options.url, ""),
        type: setDefaultVal(options.type, "GET"),
        headers: setDefaultVal(options.headers, {}),
        data: setDefaultVal(options.data, {}),
        dataType: setDefaultVal(options.dataType, "text"),
        success: setDefaultVal(options.success, function (response) {
            clog(response);
        }),
        error: setDefaultVal(options.error, function (error) {
            clog(error)
        })
    };
    // Can implement multiple methods of Ajax
    if(Window.fetch) {
        let data = new FormData();
        if (settings.data !== undefined) {
            Object.keys(settings.data).forEach(function (key) {
                data.append(key, settings.data[key]);
            });
        }

        function checkStatus(response) {
            if (response.status >= 200 && response.status < 300) {
                return response
            } else {
                let error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
        }

        function parseData(response) {
            let type = response.headers.get('Content-Type');
            if (settings.dataType === "json" || type.index("json") >= 0) {
                return response.json();
            } else {
                return response.text()
            }
        }

        fetch(settings.url, {
            method: settings.type,
            body: data
        }).then(checkStatus).then(parseData).then(settings.success).catch(settings.error)
    }else{
        $.ajax(settings);
    }
};