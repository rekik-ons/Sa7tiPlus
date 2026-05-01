package entities;

import java.io.Serializable;
import jakarta.persistence.*;
import java.util.List;


/**
 * The persistent class for the profil database table.
 * 
 */
@Entity
@NamedQueries({
	@NamedQuery(name="Profil.findAll", query="SELECT p FROM Profil p"),
	@NamedQuery(name="Profil.findUser", query="SELECT p  FROM Profil p where p.login=?1 and p.motDePasse=?2")})
public class Profil implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_profil")
	private int idProfil;

	private String login;

	@Column(name="mot_de_passe")
	private String motDePasse;

	private String profil;

	//bi-directional many-to-one association to User
	@OneToMany(mappedBy="profil", fetch=FetchType.EAGER)
	private List<User> users;

	public Profil() {
	}

	public int getIdProfil() {
		return this.idProfil;
	}

	public void setIdProfil(int idProfil) {
		this.idProfil = idProfil;
	}

	public String getLogin() {
		return this.login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getMotDePasse() {
		return this.motDePasse;
	}

	public void setMotDePasse(String motDePasse) {
		this.motDePasse = motDePasse;
	}

	public String getProfil() {
		return this.profil;
	}

	public void setProfil(String profil) {
		this.profil = profil;
	}

	public List<User> getUsers() {
		return this.users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public User addUser(User user) {
		getUsers().add(user);
		user.setProfil(this);

		return user;
	}

	public User removeUser(User user) {
		getUsers().remove(user);
		user.setProfil(null);

		return user;
	}

}