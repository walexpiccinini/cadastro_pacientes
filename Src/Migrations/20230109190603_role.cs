using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace cadastro_pacientes.Migrations
{
    public partial class role : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ROLE",
                table: "funcionario",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ROLE",
                table: "funcionario");
        }
    }
}
