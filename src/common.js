import configuration from './config';

const common = {

    fetchTableData: function(data, done) {
        fetch(configuration.baseURL + data.url, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            done(data);
        });
    },

    searchTableDate: function(reqParam, done) {
        let searchTextArray = [];
        searchTextArray.push(reqParam.text);
        const data = reqParam.data.filter((product) => {
            const keys = Object.keys(product);
            let valid = false;
            for (let i = 0, keysLength = keys.length; i < keysLength; i++) {
                const key = keys[i];
                if (reqParam.colInfos[key] && product[key]) {
                    const {
                        format,
                        filterFormatted,
                        formatExtraData,
                        searchable,
                        hidden
                    } = reqParam.colInfos[key];
                    let targetVal = product[key];
                    if (!hidden && searchable) {
                        if (filterFormatted && format) {
                            targetVal = format(targetVal, product, formatExtraData);
                        }
                        for (let j = 0, textLength = searchTextArray.length; j < textLength; j++) {
                            const filterVal = searchTextArray[j].toLowerCase();
                            if (targetVal.toString().toLowerCase().indexOf(filterVal) !== -1) {
                                valid = true;
                                break;
                            }
                        }
                    }
                }
            }
            return valid;
        });
        done(data);
    }
}

export default common;