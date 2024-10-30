<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="biblioteca">
<html>
<body>
<h2>Mi biblioteca</h2>
<table border="1">
<tr>
<th>Titulo</th>
<th>Autor</th>
<th>Editorial</th>
<th>Año</th>
</tr>
<xsl:for-each select="libro">
<tr>
<td><xsl:value-of select="titulo"/></td>
<td><xsl:value-of select="autor"/></td>
<td><xsl:value-of select="editorial"/></td>
<td><xsl:value-of select="year"/></td>
</tr>
</xsl:for-each>
</table>
</body>
</html>
</xsl:template>
</xsl:stylesheet>