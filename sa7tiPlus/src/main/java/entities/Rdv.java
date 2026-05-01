package entities;

import java.io.Serializable;
import jakarta.persistence.*;
import java.sql.Time;
import java.util.Date;
import java.sql.Timestamp;


/**
 * The persistent class for the rdv database table.
 * 
 */
@Entity
@NamedQueries(
{@NamedQuery(name="Rdv.findAll", query="SELECT r FROM Rdv r"),
@NamedQuery(name="Rdv.findByPatient", query="SELECT r FROM Rdv r where r.patient.idUser = :id")})

public class Rdv implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_rdv")
	private int idRdv;

	@Column(name="date_creation")
	private Timestamp dateCreation;

	@Temporal(TemporalType.DATE)
	private Date date_RDV;

	private Time heure_RDV;

	private String specialite;

	private String statut;

	//bi-directional many-to-one association to Patient
	@ManyToOne
	@JoinColumn(name="id_patient")
	private Patient patient;

	//bi-directional many-to-one association to Medecin
	@ManyToOne
	@JoinColumn(name="id_medecin")
	private Medecin medecin;

	public Rdv() {
	}

	public int getIdRdv() {
		return this.idRdv;
	}

	public void setIdRdv(int idRdv) {
		this.idRdv = idRdv;
	}

	public Timestamp getDateCreation() {
		return this.dateCreation;
	}

	public void setDateCreation(Timestamp dateCreation) {
		this.dateCreation = dateCreation;
	}

	public Date getDate_RDV() {
		return this.date_RDV;
	}

	public void setDate_RDV(Date date_RDV) {
		this.date_RDV = date_RDV;
	}

	public Time getHeure_RDV() {
		return this.heure_RDV;
	}

	public void setHeure_RDV(Time heure_RDV) {
		this.heure_RDV = heure_RDV;
	}

	public String getSpecialite() {
		return this.specialite;
	}

	public void setSpecialite(String specialite) {
		this.specialite = specialite;
	}

	public String getStatut() {
		return this.statut;
	}

	public void setStatut(String statut) {
		this.statut = statut;
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

}