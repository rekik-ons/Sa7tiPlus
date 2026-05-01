package entities;

import java.io.Serializable;
import jakarta.persistence.*;
import java.sql.Timestamp;
import java.util.List;


/**
 * The persistent class for the dossier database table.
 * 
 */
@Entity
@NamedQuery(name="Dossier.findAll", query="SELECT d FROM Dossier d")
public class Dossier implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_dossier")
	private int idDossier;

	private String allergie;

	@Column(name="date_creation")
	private Timestamp dateCreation;

	@Lob
	private String description;

	@Lob
	private String diagnostic;

	private String etat;

	@Column(name="etat_sante")
	private String etatSante;

	private double poids;

	private double taille;

	@Lob
	private String traitement;

	//bi-directional many-to-one association to Patient
	@ManyToOne
	@JoinColumn(name="id_patient")
	private Patient patient;

	//bi-directional many-to-one association to Medecin
	@ManyToOne
	@JoinColumn(name="id_medecin")
	private Medecin medecin;

	//bi-directional many-to-one association to Patient
	@OneToMany(mappedBy="dossier", fetch=FetchType.EAGER)
	private List<Patient> patients;

	public Dossier() {
	}

	public int getIdDossier() {
		return this.idDossier;
	}

	public void setIdDossier(int idDossier) {
		this.idDossier = idDossier;
	}

	public String getAllergie() {
		return this.allergie;
	}

	public void setAllergie(String allergie) {
		this.allergie = allergie;
	}

	public Timestamp getDateCreation() {
		return this.dateCreation;
	}

	public void setDateCreation(Timestamp dateCreation) {
		this.dateCreation = dateCreation;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getDiagnostic() {
		return this.diagnostic;
	}

	public void setDiagnostic(String diagnostic) {
		this.diagnostic = diagnostic;
	}

	public String getEtat() {
		return this.etat;
	}

	public void setEtat(String etat) {
		this.etat = etat;
	}

	public String getEtatSante() {
		return this.etatSante;
	}

	public void setEtatSante(String etatSante) {
		this.etatSante = etatSante;
	}

	public double getPoids() {
		return this.poids;
	}

	public void setPoids(double poids) {
		this.poids = poids;
	}

	public double getTaille() {
		return this.taille;
	}

	public void setTaille(double taille) {
		this.taille = taille;
	}

	public String getTraitement() {
		return this.traitement;
	}

	public void setTraitement(String traitement) {
		this.traitement = traitement;
	}

	public Patient getPatient() {
		return this.patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
	}

	public Medecin getMedecin() {
		return this.medecin;
	}

	public void setMedecin(Medecin medecin) {
		this.medecin = medecin;
	}

	public List<Patient> getPatients() {
		return this.patients;
	}

	public void setPatients(List<Patient> patients) {
		this.patients = patients;
	}

	public Patient addPatient(Patient patient) {
		getPatients().add(patient);
		patient.setDossier(this);

		return patient;
	}

	public Patient removePatient(Patient patient) {
		getPatients().remove(patient);
		patient.setDossier(null);

		return patient;
	}

}