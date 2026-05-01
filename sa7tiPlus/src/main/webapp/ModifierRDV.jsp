<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>Modifier RDV</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<div class="container-fluid vh-100">
    <div class="row h-100">
        <div class="col-md-4 left-panel d-flex align-items-center justify-content-center">
            <img src="assets/images/logo.png" class="logo-img" alt="Logo">
        </div>
        <div class="col-md-8 d-flex align-items-center justify-content-center">
            <div class="dossier-card p-4 shadow">
                <h3 class="text-center mb-4" style="color: #55b3b3;">Modifier Rendez-vous</h3>
                
                <form action="Controller" method="get">
                    <input type="hidden" name="idRdv" value="${rdvToEdit.idRdv}">

                    <div class="mb-3">
                        <label class="form-label fw-bold">Date</label>
                        <input type="date" name="dateRdv" class="form-control custom-input" value="${rdvToEdit.date_RDV}" required>
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-bold">Heure</label>
                        <input type="time" name="heureRdv" class="form-control custom-input" value="${rdvToEdit.heure_RDV}" required>
                    </div>

                    <div class="mb-4">
                        <label class="form-label fw-bold">Spécialité</label>
                        <select name="specialite" class="form-select custom-input">
                            <option value="Cardiologie" ${rdvToCreate.specialite == 'Cardiologie' ? 'selected' : ''}>Cardiologie</option>
                                <option value="Ophtalmologie" ${rdvToCreate.specialite == 'Ophtalmologie' ? 'selected' : ''}>Ophtalmologie</option>
                                <option value="Dermatologie" ${rdvToCreate.specialite == 'Dermatologie' ? 'selected' : ''}>Dermatologie</option>
                                <option value="Généraliste" ${rdvToCreate.specialite == 'Généraliste' ? 'selected' : ''}>Généraliste</option>
                                <option value="Pédiatrie" ${rdvToCreate.specialite == 'Pédiatrie' ? 'selected' : ''}>Pédiatrie</option>
                                
                        </select>
                    </div>

                    <div class="d-flex justify-content-end gap-2">
                        <button type="submit" name="btnAction" value="Annuler" class="btn btn-light px-4">Annuler</button>
                        <button type="submit" name="btnAction" value="Enregistrer Modification" class="btn btn-custom px-4">Enregistrer</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</body>
</html>