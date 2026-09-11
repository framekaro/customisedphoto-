const pincodeInput =
    document.getElementById("customer-pincode");

const cityInput =
    document.getElementById("customer-city");

const districtInput =
    document.getElementById("customer-district");

const stateInput =
    document.getElementById("customer-state");


if (pincodeInput) {

    pincodeInput.addEventListener(
        "input",
        function () {

            const pincode =
                this.value.replace(/\D/g, "");

            this.value = pincode;

            if (pincode.length !== 6) {
                cityInput.value = "";
                districtInput.value = "";
                stateInput.value = "";
                return;
            }

            cityInput.value = "Loading...";
            districtInput.value = "Loading...";
            stateInput.value = "Loading...";


            fetch(
                "https://api.postalpincode.in/pincode/" +
                pincode
            )
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {

                if (
                    !data ||
                    !data[0] ||
                    data[0].Status !== "Success" ||
                    !data[0].PostOffice ||
                    data[0].PostOffice.length === 0
                ) {

                    cityInput.value = "";
                    districtInput.value = "";
                    stateInput.value = "";

                    alert("Invalid PIN Code.");

                    return;
                }


                const postOffice =
                    data[0].PostOffice[0];


                cityInput.value =
                    postOffice.Name || "";

                districtInput.value =
                    postOffice.District || "";

                stateInput.value =
                    postOffice.State || "";

            })
            .catch(function () {

                cityInput.value = "";
                districtInput.value = "";
                stateInput.value = "";

                alert(
                    "PIN Code details load nahi ho paayi. Please try again."
                );
            });

        }
    );

}
