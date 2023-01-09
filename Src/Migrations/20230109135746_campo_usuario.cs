using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace cadastro_pacientes.Migrations
{
    public partial class campo_usuario : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "USUARIO",
                table: "funcionario",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "USUARIO",
                table: "funcionario");
        }
    }
}
