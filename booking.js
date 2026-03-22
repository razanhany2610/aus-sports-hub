import java.sql.Timestamp;

public class User {
    private Long id;
    private String username;
    private String password;
    private String fullName;
    private String studentId;
    private String role;
    private Timestamp createdAt;
    private Boolean isActive;
    
    // Constructors
    public User() {}
    
    public User(String username, String password, String fullName, String studentId, String role) {
        this.username = username;
        this.password = password;
        this.fullName = fullName;
        this.studentId = studentId;
        this.role = role;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    
    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }
    
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    
    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }
    
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
}