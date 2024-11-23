import {google} from 'googleapis'

// Configura tu cliente OAuth2 con el ID y el secreto obtenidos en Google Cloud Console
const CLIENT_ID = '153485994273-erft01dtgl8dv4h01mm0bb7hde6n1n0o.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:5001/api/oauth/google';

// Inicializa el cliente OAuth2
const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// URL para redirigir al usuario a autorizar
const SCOPES = ['https://www.googleapis.com/auth/calendar'];

export const getAuthUrl = async (req, res) => {
    const result = await  oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES, 
    })

    res.send(result)
}

export const createMeetEventWithParticipants = async (req, res) =>{
    try {
    const title = ''
    const description = ''
    const emailCandidate = ''
    const startDate = ''
    const endDate = ''

        console.log(req.query)
        // Intercambiar el código por un token de acceso
        const { tokens } = await oauth2Client.getToken(req.query.code);
        oauth2Client.setCredentials(tokens);

        // Crear el servicio de Google Calendar
        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

        // Configuración del evento con asistentes
        const event = {
            summary: title,
            description: description,
            start: {
                dateTime: '2024-11-05T10:00:00-07:00',
                timeZone: 'America/Los_Angeles',
            },
            end: {
                dateTime: '2024-11-05T11:00:00-07:00',
                timeZone: 'America/Los_Angeles',
            },
            attendees: [
                { email: emailCandidate },
             ,
                // Agrega más participantes según sea necesario
            ],
            conferenceData: {
                createRequest: {
                    requestId: 'some-random-string', // Usa un string único para cada reunión
                },
            },
        };

        // Crear el evento en el calendario del usuario
        const response = await calendar.events.insert({
            calendarId: 'primary',
            resource: event,
            conferenceDataVersion: 1, // Necesario para generar el enlace de Google Meet
            sendUpdates: 'all', // Enviar invitaciones por correo a los asistentes
        });

        console.log('Evento creado con éxito:', response.data);
        console.log('Enlace de Google Meet:', response.data.hangoutLink);
        console.log('Participantes:', response.data.attendees);
    } catch (error) {
        console.error('Error creando el evento:', error);
    }
}




