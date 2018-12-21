// API POST REQUEST TO ADD NEW TESTIMONIAL 
$(function () {

    $(".create-form").on("submit", function (event) {

        event.preventDefault();

        var newTesti = {
            // grab the values
            review: $("#text").val().trim(),
            author: $("#name").val().trim(),
            city: $("#city").val().trim()
        };

        // Send POST request

        $.ajax("/api/testimonials", {
            type: "POST",
            data: newTesti
        }).then(
            function () {
                console.log("New Review");
                // Reload the page to get updated list
                location.reload();
            }
        );
    });
});


$(function () {
    $(".deleteprod").on("click", function () {
        var id = $(this).val()

        $.ajax("/api/supervisor/" + id, {
            type: "DELETE"
        }).then(
            function () {
                console.log("deleted product id:", id);
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
});

$(function () {
    $(".updateprod").on("click", function () {
        $("." + id).empty()


        var form = $("<form>")
        var id = $(this).val()
        var p1 = $("<p>")
        var input1 = $("<input>")
        var p2 = $("<p>")
        var input2 = $("<input>")
        var submit = $("<button>")


        p1.text("Data field you would like to modify: ")
        input1.attr("type", "text")
        input1.attr("id", "column" + id)
        p2.text("New value: ")
        input2.attr("type", "text")
        input2.attr("id", "value" + id)
        submit.attr("type", "submit")
        submit.text("submit")
        submit.attr("id", "submit" + id)

        form.append(p1)
        form.append(input1)
        form.append(p2)
        form.append(input2)
        form.append(submit)
        $("." + id).append(form)



        $("#submit" + id).on("click", function (event) {

            event.preventDefault()
            var Column = $("#column" + id).val().trim()
            var newValue = $("#value" + id).val().trim()

            var newUpdate = {
                col: Column,
                val: newValue
            };

            $.ajax("/api/supervisor/" + id, {
                type: "PUT",
                data: newUpdate
            }).then(
                function () {
                    location.reload();
                }
            );
        })
    })
});

$(function () {
    $("#addprodsubmit").on("click", function (event) {
        event.preventDefault()
        var newProd = {
            id: $("input[name=id]").val(),
            name: $("input[name=name]").val(),
            price: $("input[name=price]").val(),
            img: $("input[name=image]").val(),
            designer: $("input[name=designer]").val(),
            catergory: $("input[name=category]").val()
        }
        console.log(newProd)
        $.ajax("/api/supervisor/add", {
            type: "POST",
            data: newProd
        }).then(
            function () {
                console.log("New Product added");

                location.reload();
            }
        );
    });
});

$(function () {
    $(".deletetesti").on("click", function (event) {

        var id = $(this).val()

        console.log(this)
        console.log($(this))

        console.log(this.val)

        $.ajax("/api/suptesti/" + id, {
            type: "DELETE"
        }).then(
            function () {
                console.log("deleted testimonial id:", id);
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
});

$(function () {
    $("#sort").on("click", function (event) {
        event.preventDefault()
        var sortTerm = $("#sortselect").val()

        console.log(sortTerm)
        window.location.href = '/productview/' + sortTerm
    });
});


$(function () {
    $(".searchlink").on("click", function () {
        
        var sortTerm = $(this).val()

        console.log(sortTerm)
        window.location.href = '/productview/select/' + sortTerm
    });
});

$(function () {
    $("#testimonials-header").on("click", function () {
        
        window.location.href = '/testimonials'
    });
});

$(function () {
    // add to cart modal function
    $(".cartBtn").on("click", function (event) {

        event.preventDefault;
        // id for button
        var id = $(this).data("id");
        // console.log("Your buttonID is: " + id);
        $("#product-dump").empty();
        $("#price-dump").empty();
        $("#designer-dump").empty();

        $.get("/api/productview/" + id, function (data) {
            // // This whole code populates the modal when clicked 
            var productID = data.product[0].id;
            var name = data.product[0].name;
            var img = data.product[0].img;
            var price = "$" + data.product[0].price;
            var designer = data.product[0].designer;
            console.log("PRODUCT CONTENT: " + "\n" + "product id: " + productID + "\n" + name + "\n" + price + "\n" + designer
                + "\n" + img);
            $("#product-dump").append(name);
            $("#price-dump").append(price);
            $("#designer-dump").append(designer);
            $("#productImg").attr("src", img);
            $("#product").val(name);
        });

        $("#cart-modal").modal("toggle");

    });
});

$(function () {

    $(".product-form").on("submit", function (event) {

        event.preventDefault();

        // Validate the form if user answered incomplete

        function formValidate() {

            var answerValid = true;

            // loop through username, product, quantity
            $(".firstForm").each(function () {
                if ($(this).val() === '') {
                    answerValid = false;
                }
            });

            return answerValid;
        }

        if (formValidate() == true) {
            var newOrder = {
                userid: $("input[name=userName]").val(),
                products: $("input[name=product]").val(),
                quantity: $("input[name=quantity]").val()
            }


            // Pulling out the value from USER input
            var userid = newOrder.userid
            var cartProduct = newOrder.products;
            var cartQuantity = newOrder.quantity;

            // console.log("userid: " + userid + "\n" + "products: " + cartProduct + "\n" + "quantity: " + cartQuantity);

            // // empty out the modal content
            $("#product-dump").empty();
            $("#price-dump").empty();
            $("#designer-dump").empty();
            $("#productImg").hide();
            $(".product-form").hide();

            alert("Hey " + userid + ", " + " you just added " + cartQuantity + " " + cartProduct + " in your cart.");


            $.ajax("/api/carts", {
                type: "POST",
                data: newOrder
            }).then(
                function () {
                    console.log("New Order Made!");
                    location.reload();
                });

        } else {
            alert("Please answer all fields first.")
        }
    });
});

$(function () {
    $("#shoppingcart").on("click", function (event) {


        event.preventDefault();

        // var userid = newOrder.userid
        $.get("/api/carts/" + userid, function (data) {

            console.log(data);

            // var cartuserID = data.carts[0].userid;
            // var cartProduct = data.carts[0].products;
            // var cartQuantity = data.carts[0].quantity;
            // console.log("NEW ORDER MADE!" + "\n"
            //     + cartuserID + "\n"
            //     + cartProduct + "\n"
            //     + cartQuantity);
            // $("#user-dump").append(cartuserID);
            // $("#quantity-dump").append(cartQuantity);
            // $("#product-dump").append(cartProduct);
        });
    })
});




$(function () {
    $(".deleteorder").on("click", function (event) {
        var condition = $(this).val();

        console.log(condition);

        $.ajax("/api/supervisorordersview/" + condition, {
            type: "DELETE"
        }).then(
            function () {
                console.log("deleted User: " + userid);
                location.reload();
            }
        );
    });
});


