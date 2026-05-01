package mvcController;

import jakarta.ejb.EJB;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import mvcModel.AdminService;
import mvcModel.PatientService;
import mvcModel.RdvService;

import java.io.IOException;
import java.util.List;

import entities.Patient;
import entities.Profil;
import entities.Rdv;
import entities.User;

@WebServlet("/Controller")
public class Controller extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @EJB
    private AdminService adminService;
    @EJB
    private PatientService patientService;
    @EJB
    private RdvService rdvservice;

    public Controller() {
        super();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
        String btn0 = request.getParameter("btn");           // Connexion
        String button = request.getParameter("btnRDV");     // Création RDV
        String btnAction = request.getParameter("btnAction"); // Actions dans ModifierRDV.jsp
        String btnName = request.getParameter("myBtn");      // Actions dans ConsulterPatient.jsp
        
        HttpSession session = request.getSession();

        // --- 1. AUTHENTIFICATION ---
        if ("Se Connecter".equals(btn0)) {
            String log = request.getParameter("login");
            String pass = request.getParameter("password");
            Profil p = adminService.connexion(log, pass);
            
            if (p != null) {
                // On garde le profil entier en session pour que tes collègues y accèdent
                session.setAttribute("userConnecte", p);
                // On récupère le type de profil (Administrateur, Médecin ou Patient)
                String typeProfil = p.getProfil(); 

                if ("Administrateur".equalsIgnoreCase(typeProfil)) {
                    response.sendRedirect("admin_dashboard.jsp");
                    System.out.println("Bienvenue Admin"); 
                    
                } else if ("Médecin".equalsIgnoreCase(typeProfil)) {
                    response.sendRedirect("medecin_home.jsp");
                    System.out.println("Bienvenue Medecin"); 
                    
                } else if ("Patient".equalsIgnoreCase(typeProfil)) {
                    System.out.println("Bienvenue Patient"); 
                    User u = p.getUsers().get(0);
                    Patient pt = u.getPatient();
                    
                    if (pt != null) {
                        List<Rdv> actualises = rdvservice.getRDVByPatient(pt.getIdUser()); 
                        pt.setRdvs(actualises);
                    }
                    session.setAttribute("userConnecte", p);
                    response.sendRedirect("Controller?myBtn=consulter");
                }
                } else {
                request.setAttribute("errorMsg", "Login ou mot de passe incorrect");
                request.getRequestDispatcher("connexion.jsp").forward(request, response);
            }
            return;
        }

        // --- 2. DECONNEXION ---
        else if ("deconnexion".equals(btnName)) {
            response.sendRedirect("Connexion.jsp");
            return;
        }

        // --- 3. ANNULER UN RDV ---
        else if ("archiver".equals(btnName)) {
            try {
                int id = Integer.parseInt(request.getParameter("id"));
                Rdv r = rdvservice.getRdvById(id);
                if (r != null) {
                	rdvservice.archiverRDV(r); // Appel de la méthode de suppression
                    System.out.println("RDV ID " + id + " supprimé avec succès !");
                }
                response.sendRedirect("Controller?myBtn=consulter");
                System.out.println("RDV Annulé !");
            } catch (Exception e) { 
            	System.err.println("ERREUR SUPPRESSION : " + e.getMessage());
            	e.printStackTrace(); }
            return;
        }

        // --- 4. MODIFIER : AFFICHAGE DE L'INTERFACE ---
        else if ("Modifier".equals(btnName)) { 
            try {
                int id = Integer.parseInt(request.getParameter("id"));
                Rdv r = rdvservice.getRdvById(id);
                if (r != null) {
                    request.setAttribute("rdvToEdit", r);
                    request.getRequestDispatcher("ModifierRDV.jsp").forward(request, response);
                    return; 
                }else {
                    System.out.println("Erreur : L'ID reçu est vide !");
                }
            } catch (Exception e) { e.printStackTrace(); }
        }

        // --- 5. MODIFIER : ENREGISTREMENT EN BASE ---
        else if ("Enregistrer Modification".equals(btnAction)) {
            try {
                int idRdv = Integer.parseInt(request.getParameter("idRdv"));
                Rdv r = rdvservice.getRdvById(idRdv);
                
                if (r != null) {
                    r.setSpecialite(request.getParameter("specialite"));
                    java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd");
                    r.setDate_RDV(sdf.parse(request.getParameter("dateRdv")));
                    
                    String heure = request.getParameter("heureRdv");
                    if(heure.length() == 5) heure += ":00";
                    r.setHeure_RDV(java.sql.Time.valueOf(heure));
                    
                    rdvservice.modifierRDV(r);
                    System.out.println("Modification réussie !");
                }
                else {System.out.println("Modification échoué !");}
            } catch (Exception e) { e.printStackTrace(); }
            return;
        }

        // --- 6. PRENDRE / CREER UN RDV ---
        else if ("Créer RDV".equals(btnName)) {
            try {
                    request.getRequestDispatcher("prendreRDV.jsp").forward(request, response);
                    return; 
            } catch (Exception e) { e.printStackTrace(); }
            return;
        }
        else if ("Prendre RDV".equals(button)) {
            try {
            	Profil user = (Profil) request.getSession().getAttribute("userConnecte");
                String nom = request.getParameter("nom");
                String prenom = request.getParameter("prenom");
                String specialite = request.getParameter("specialite");
                Patient p = patientService.trouvPatientNomPrenom(nom, prenom);

               
                if (p != null) {
                	Rdv r = new Rdv();
                    java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd");
                    r.setDate_RDV(sdf.parse(request.getParameter("dateRdv")));
                    r.setHeure_RDV(java.sql.Time.valueOf(request.getParameter("heure") + ":00"));
                    r.setSpecialite(specialite);
                    r.setStatut("En Attente");    
                    r.setPatient(p); 
                    rdvservice.prendreRDV(r);
                    request.setAttribute("message", "Rendez-vous enregistré avec succès !");
                    //request.getRequestDispatcher("prendreRDV.jsp").forward(request, response);
                    response.sendRedirect("Controller?myBtn=consulter");
                    return;
                } else {
                	request.setAttribute("message", "Erreur : Ce patient n'existe pas dans la base.");
                	response.sendRedirect("Controller?myBtn=consulter");
                }
            } catch (Exception e) { e.printStackTrace(); }
            return;
        }else if("Annuler".equals(button)) {
        	response.sendRedirect("Controller?myBtn=consulter");
        }
        else if("Annuler".equals(btnAction)) {
        	response.sendRedirect("Controller?myBtn=consulter");
        }

        // --- 7. CONSULTATION (PAR DÉFAUT) ---
        else {
            Profil prof = (Profil) session.getAttribute("userConnecte");
            if (prof != null && prof.getUsers() != null && !prof.getUsers().isEmpty()) {
                User u = prof.getUsers().get(0);
                Patient pt = u.getPatient();
                if (pt != null) {
                    List<Rdv> maListe = pt.getRdvs();
                    request.setAttribute("mesRdvs", maListe);
                    request.getRequestDispatcher("ConsulterPatient.jsp").forward(request, response);
                }
            } else {
                response.sendRedirect("connexion.jsp");
            }
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
}