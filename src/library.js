export function getReadableSize(size) {
    const arr = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB'];
    let newSize = size;
    for (const item in arr) {
        if (newSize < 1024) {
            return `${Math.ceil(newSize)} ${arr[item]}`;
        }
        newSize /= 1024;
    }
    return `${Math.ceil(newSize)} B`;
}

export function getTime () {
    var date = new Date();
    var tRegex = '^([0-1]?[0-9]|[2][0-3]):([0-5][0-9])(:[0-5][0-9])?';
    return date.toTimeString().match(tRegex)[0];
}

export function sendToServer (file, text) {
    var formData = new FormData();
    formData.append("user", 'Liliya');
    formData.append("date", `${getTime()} ${(new Date()).toDateString()}`);
    if (text === '') {
        formData.append("file", file);
    } else {
        formData.append("text", text);
    }

    fetch ('http://127.0.0.1:8082/message', {
        method: 'POST',  
        body: formData
    }).then (function(response) {
        //this_ptr.props.updateData(text, getTime(), '');
        return response;
    }).catch (function(err) { 
        console.log(err);
        console.log('no!')
    });
}