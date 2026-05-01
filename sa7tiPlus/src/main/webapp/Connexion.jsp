<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Connexion-sa7tiPlus</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<div class="container mt-5">
<h2>Connexion</h2>
<c:if test="${not empty errorMsg}">
        <div class="alert alert-danger">${errorMsg}</div>
    </c:if>
</div>
<form method="get" action="Controller" >
<div class="mb-3">
	<input type="text" name="login" placeholder="login" required><br><br>
</div>
<div class="mb-3">
	<input type="password" name="password"  placeholder="mot de passe" required><br><br>
</div>
<button type="submit" name="btn" value="Se Connecter" class="btn btn-primary">Se Connecter</button>
</form>
</body>
</html>