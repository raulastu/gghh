module.exports = function(db, transporter) {
    var mail={};

    var error_messages = {
        incorrect_login: 'email o password incorrectos',
        account_not_verified: 'Please verify your account. Check also the spam folder.',
        invalid_user: 'Usuario ya existe. Porfavor ingresa un email diferente',
        incorrect_message: 'Message could not be sent'
    }



    var mail_data_en = {
        min_raized: {
            from: 'PichangaMaker <pichangamaker@pichangamaker.com>',
            subject: 'Pichanga Confirmed!',
            text: 'The minimum number of players required for the Pichanga was reached ✔'
        },
        deleted_pichanga: {
            from: 'PichangaMaker <pichangamaker@pichangamaker.com>',
            subject: 'Pichanga Canceled',
            text: 'The Pichanga was canceled. We are so sorry'
        },
        removed_pichanga: {
            from: 'PichangaMaker <pichangamaker@pichangamaker.com>',
            subject: 'Removed from Pichanga',
            text: 'You were removed from the Pichanga'
        },
        activate_account: {
            from: 'PichangaMaker <pichangamaker@pichangamaker.com>',
            subject: 'Activate your account',
            text: 'You need to verify that you own this email account'
        },
        created_pichanga: {
            from: 'PichangaMaker <pichangamaker@pichangamaker.com>',
            subject: 'Estas invitado a una nueva Pichanga',
            text: 'Confirma tu asistencia ahora',
            hideassistants: true
        },
        change_password: {
            from: 'PichangaMaker <pichangamaker@pichangamaker.com>',
            subject: 'It seems you forgot your password',
            text: 'You have requested to change your password.'
        }
    }
    var mail_data = {
        min_raized: {
            from: 'PichangaMaker <pichangamaker@pichangamaker.com>',
            subject: 'Pichanga Confirmed!',
            text: 'The minimum number of players required for the Pichanga was reached ✔'
        },
        deleted_pichanga: {
            from: 'PichangaMaker <pichangamaker@pichangamaker.com>',
            subject: 'Pichanga Canceled',
            text: 'The Pichanga was canceled. We are so sorry'
        },
        removed_pichanga: {
            from: 'PichangaMaker <pichangamaker@pichangamaker.com>',
            subject: 'Removed from Pichanga',
            text: 'You were removed from the Pichanga'
        },
        activate_account: {
            from: 'PichangaMaker <pichangamaker@pichangamaker.com>',
            subject: 'Activate your account',
            text: 'You need to verify that you own this email account'
        },
        created_pichanga: {
            from: 'PichangaMaker <pichangamaker@pichangamaker.com>',
            subject: 'Una nueva pichanga ha sido creada en uno de tus grupos',
            text: 'Confirm your assistance to the Pichanga now!',
            hideassistants: true
        },
        change_password: {
            from: 'PichangaMaker <pichangamaker@pichangamaker.com>',
            subject: 'It seems you forgot your password',
            text: 'You have requested to change your password.'
        }
    }


    mail.sendMail = function(data, callback) {

        var mail_options = {
            from: data.from,
            to: data.emails,
            subject: data.subject,
            html: data.message
        };

        transporter.sendMail(mail_options, function(error, info){
            if(error) {
                console.log(error);
                callback({
                    me: error_messages.incorrect_message,
                    error: error
                });
            }
            else {
                console.log('Message sent: ' + info.response);
                callback({data: info});
            }
        });

    };

    mail.change_password_html = function(info, mail_object, link){
        var message = "";
        message += "<html>Dear " + info.name + "<br/><br/>";
        message += mail_object.text + "<br/><br/>";
        message += "Please go to the next link to change your password for the following user: <strong>" + info.email + "</strong><br/><br/>";
        message += link + "<br/><br/>";
        message += "Thanks!!<br/>";
        message += "PichangaMaker";
        message += "</html>";

        return message;
    };

    mail.activation_mail_html = function(info, mail_object, link){
        var message = "";
        message += "<html>Dear " + info.name + "<br/><br/>";
        message += mail_object.text + "<br/><br/>";
        message += "Please go to the next link to verify the following user: <strong>" + info.email + "</strong><br/><br/>";
        message += link + "<br/><br/>";
        message += "Thanks!!<br/>";
        message += "PichangaMaker";
        message += "</html>";

        return message;
    }

    mail.invitation_mail_html = function(pichanga, guest, guests_data, mail_object){
        // var link = website + "quick_confirmation/" + guest.token + "/" + guest.email;
        var message = "";

        message += "<html>";
        message += "Dear " + guest.name + ":<br/><br/>";
        message += mail_object.text + "<br/><br/>";
        message += "The organizer will contact you to tell about the details<br/><br/>";
        message += "Pichanga: " + pichanga.name + "<br/><br/>";
        message += "Organizator: " + pichanga.organizator_name + "<br/><br/>";
        message += "Price: S/." + (pichanga.fee || "To be confirmed") + "<br/><br/>";
        message += "Date: " + new Date(pichanga.start_date).toLocaleString() + "<br/><br/>";

        message += "Invitados en tu grupo<br/>";
        message += "<ul>";
        for (i = 0; i < guests_data.length; i++){
            message += "<li>" + guests_data[i].name + "</li>";
        }
        message += "</ul><br/><br/>";

        message += "</ul><br/>";
        message += "Thanks!!<br/><br/>";
        message += "PichangaMaker</html>";

        return message;
    };

    mail.sendPichangaInvitation = function(pichangaId, pichanga, callback){
        pichanga.getPichangaGuests(pichangaId, function(data){
            var guests_data = data;

            pichanga.getPichangaInfoById(pichangaId, function(data){
                var pichanga_data = data;

                console.log('data mail');
                console.log(guests_data);
                console.log(pichanga_data);
                console.log('fin data mail');

                for (var i=0; i < guests_data.length; i++){
                    var html_mail = mail.invitation_mail_html(pichanga_data, guests_data[i], guests_data, mail_data.created_pichanga);

                    var message_data = {
                        from: mail_data.created_pichanga.from,
                        subject: mail_data.created_pichanga.subject,
                        emails: guests_data[i].email,
                        message: html_mail
                    }

                    mail.sendMail(message_data, function(data){
                    });
                }

                callback({data: []});
            });
          });
    };

    mail.sendForgotMail = function(email, website, users, callback){
        console.log('mail forgot');

        users.getToken(email, function(data){
            var token = data.token;
            console.log('token', token);

            var link = website + "#/forgot/" + token + "/" + email;

            users.getByEmail(email, function(data){
                var person_info = data;
                console.log('person_info', person_info);

                if(Object.keys(person_info).length){
                    var html_mail = mail.change_password_html(person_info, mail_data.change_password, link);
                    console.log(html_mail);

                    var send_info = {
                        from: mail_data.change_password.from,
                        emails: person_info.email,
                        subject: mail_data.change_password.subject,
                        message: html_mail
                    };

                    mail.sendMail(send_info, function(data){
                        callback(data);
                    });

                }
                else{
                    callback({me: "The mail is not registered"});
                }
            });
        });
    }

    mail.sendActivationMail = function(email, website, users, callback){
        console.log('mail activation');

        users.getToken(email, function(data){
            var token = data.token;
            console.log('token', token);

            var link = website + "#/verification/" + token + "/" + email;

            users.getByEmail(email, function(data){
                var person_info = data;
                console.log('person_info', person_info);

                if(Object.keys(person_info).length){
                    var html_mail = mail.activation_mail_html(person_info, mail_data.change_password, link);
                    console.log(html_mail);

                    var send_info = {
                        from: mail_data.activate_account.from,
                        emails: person_info.email,
                        subject: mail_data.activate_account.subject,
                        message: html_mail
                    };

                    mail.sendMail(send_info, function(data){
                        callback(data);
                    });

                }
                else{
                    callback({me: "The mail is not registered"});
                }
            });
        });
    };



    return mail;
};

