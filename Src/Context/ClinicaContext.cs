using cadastro_pacientes.Models;
using Microsoft.EntityFrameworkCore;

public class ClinicaContext : DbContext
{
    public ClinicaContext(DbContextOptions<ClinicaContext> options):base(options){}

    public DbSet<User> Users {get;set;} = null!;
    public DbSet<Paciente> Pacientes {get;set;} = null!;
}