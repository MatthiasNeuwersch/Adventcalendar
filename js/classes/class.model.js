"use strict";

/********************************************************************************
 *     ADV_Model
 *
 *     Well, there is no API.
 *     Nevertheless, to provide some decent privacy for sensitive content like
 *     toddler-pictures, and some security features (i.e. to prevent cheating
 *     or skipping), named content will be provided via hidden services in PHP.
 *
 *     ADV_Model handles the communication with these PHP-Resources, in a very
 *     minimalistic way of asynchronous JavaScript.
 *
 *
 *     ShaBy - 2020-11-27
 ********************************************************************************/

class ADV_Model {
    static API_ROOT = "https://advent.neuwersch.eu/api.php";
    constructor() {

    }

    /********************************************************************************
     *   Method: fetchTemplate
     *
     *   This is a template for fetching data from several PHP-Resources.
     *   Profound knowledge of the specific resource might be neccessary,
     *   in order to handle the response in a useful way.
     *
     *  @param:
     *          resource: URL to .php resource.
     *
     *******************************************************************************/
    fetchTemplate(task) {
        return new Promise((resolve, reject) => {
            fetch(ADV_Model.API_ROOT, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "dwarfonize": window.Utils.getCookie("dwarfonize"),
                    "task": task
                })
            }).then(function (response) {
                return response.ok ? response.json() : Promise.reject(response);
            }).then(function (data) {
                resolve(data);
            }).catch(function (err) {
                console.warn('Something went wrong.', err);
            });
        });
    }
}
export default ADV_Model;