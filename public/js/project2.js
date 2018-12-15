$(function () {
    // API POST REQUEST TO ADD NEW REVIEW 
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

$(function(){
$(".deleteprod").on("click", function(){
    var id = $(this).val()

        $.ajax("/api/supervisor/" + id, {
          type: "DELETE"
        }).then(
          function() {
            console.log("deleted product id:", id);
            // Reload the page to get the updated list
            location.reload();
          }
        );
      });


})


$(function() {
    $(".updateprod").on("click", function() {
        $("."+id).empty() 


    var form = $("<form>")
    var id = $(this).val()
    var p1 = $("<p>")
    var input1 = $("<input>")
    var p2 = $("<p>")
    var input2 = $("<input>")
    var submit = $("<button>")

    
    p1.text("Data field you would like to modify: ")
    input1.attr("type", "text")
    input1.attr("id", "column"+id)
    p2.text("New value: ")
    input2.attr("type", "text")
    input2.attr("id", "value"+id)
    submit.attr("type", "submit")
    submit.text("submit")
    submit.attr("id", "submit" + id)

        form.append(p1)
        form.append(input1)
        form.append(p2)
        form.append(input2)
        form.append(submit)
        $("."+id).append(form)


  
    $("#submit"+ id).on("click", function(event){

    event.preventDefault()
    var Column = $("#column"+id).val().trim()
    var newValue = $("#value"+id).val().trim()
  
      var newUpdate = {
        col: Column,
        val: newValue
      };
        
      $.ajax("/api/supervisor/" + id, {
        type: "PUT",
        data: newUpdate
      }).then(
        function() {
          location.reload();
        }
      );
    })
    })
})



$(function(){
    $("#addprodsubmit").on("click", function(event){
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
       

    })

    $(function(){
        $(".deletetesti").on("click", function(event){
   
            var id = $(this).val()

            console.log(this)
            console.log($(this))
            
            console.log(this.val)
        
                $.ajax("/api/suptesti/" + id, {
                  type: "DELETE"
                }).then(
                  function() {
                    console.log("deleted testimonial id:", id);
                    // Reload the page to get the updated list
                    location.reload();
                  }
                );
              });
        
        
        })
        $(function(){
            $("#sort").on("click", function(event){
                event.preventDefault()
                var sortTerm = $("#sortselect").val()
           
                console.log(sortTerm)
                window.location.href='/productview/'+sortTerm
                  });
            
            
            })

    
