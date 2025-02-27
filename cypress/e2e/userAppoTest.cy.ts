
import { User } from '../../src/app/interfaces/user';
import { Appointment } from '../../src/app/interfaces/appointment';

describe('un paciente ingresa a la pagina y termina registrando un turno nuevo', () => {

    //Mockeando un usuario 
    const user: User = {
        dni: '42178733',
        password: '1234',
        codUser: 1,
    };

    it('deberia acceder a la pagina de login', function () {
        
        cy.visit('http://localhost:4200');

    });

    it('deberia loguear al usario, guardar la token y redireccionarlo al dashboard' , function () {
        
        cy.request('POST','http://localhost:3000/api/users/login',{user}).then((response) => {
            expect(response.body.token).to.exist;
            window.sessionStorage.setItem('token',response.body.token);
            Cypress.env('token', response.body.token);
            cy.visit('http://localhost:4200/home');
       });

    });

    it('deberia acceder a "solicitar turnos" ver las especialidades disponibles', function (){
        
        cy.request('GET','http://localhost:3000/api/specialties/').then((response) => {
            
            expect(response).to.exist;
            //Muestro asi ya que no se puede visualizar en la pagina ya que la variable user de SpecialtyComponent esta vacia
            console.log(response.body.data) ;
            cy.visit('http://localhost:4200/specialtyList');

        });
    });
    
    it('seleccionando una especialidad deberia luego mostrar los consultorios con doctores de dicha especialidad', function (){

        const token = Cypress.env('token')
        cy.request({
            method: 'GET',
            url: `http://localhost:3000/api/doctor_consultings/search/Cardiología`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
        }).then((response) => {

            cy.visit('http://localhost:4200/doconsList')
            expect(response).to.exist;
            console.log(response.body.data);

        });
    });

    it('seleccionando la instancia laboral luego se elige dia valido y horario disponbile para completar el turno', function () {

        cy.request('GET','http://localhost:3000/api/appointments').then((response) => {
            //Buscando todos los appointments, y luego filtrarlos por estado para obtener fecha y horario disponibles
            expect(response).to.exist;
            console.log(response.body.data);
        })

        const token = Cypress.env('token')

        cy.request({
            //Buscar el consultorio con su id para mostrar sus datos localmente
            method: 'GET',
            url: `http://localhost:3000/api/doctor_consultings/5`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
        }).then((response) => {

            cy.visit('http://localhost:4200/addAppointment/5')
            expect(response).to.exist;
            console.log(response.body.data);

        });

        //Mockeando un appointment valido
        const appointment: Appointment = {
            appoDate: "2025-02-28",
            appoTime: "20:00",
            assisted: "Vigente",
            doctor_consulting: 5,
            patient: 1,
        };
        cy.request('POST','http://localhost:3000/api/appointments', appointment).then((response) => {
            
            expect(response).to.exist;
            console.log(response);

        });
    });
});