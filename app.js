// Get a random passphrase o repeatably generate this RSA key.
var random_strings_url = "https://www.random.org/strings/?num=10&len=20&digits=on&upperalpha=on&loweralpha=on&format=plain&rnd=new";

$.get(random_strings_url, function(response){
    var pass_phrase = response.replace(/\n/g, "");
    var bits = 2048;
    var own_keypair = cryptico.generateRSAKey(pass_phrase, bits);
    var own_public_key = cryptico.publicKeyString(own_keypair); 

    $("#loading").fadeOut(300);

    // Receiving a message
    $("#own-public-key").html(own_public_key);
    $("#external-encrypted-message").on("keyup", function(){
        var encrypted_message = $("#external-encrypted-message").val();
        var decrypted_message = cryptico.decrypt(encrypted_message, own_keypair);
        console.log(decrypted_message);
        $("#external-decrypted-message").html(decrypted_message.plaintext);
    });

    // Sending a message
    $("#own-plain-message, #external-public-key").on("keyup", function(){
        var plain_message = $("#own-plain-message").val();
        var public_key = $("#external-public-key").val();
        var encrypted_message = cryptico.encrypt(plain_message, public_key);

        console.log(public_key);
        console.log(plain_message);
        console.log(encrypted_message)

        $("#own-encrypted-message").val(encrypted_message.cipher);
    });
});
