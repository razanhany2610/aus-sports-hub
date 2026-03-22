public class Court {
    private Long id;
    private String courtName;
    private Long sportId;
    private String courtType;
    private String status;
    
    public Court() {}
    
    public Court(String courtName, Long sportId, String courtType, String status) {
        this.courtName = courtName;
        this.sportId = sportId;
        this.courtType = courtType;
        this.status = status;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getCourtName() { return courtName; }
    public void setCourtName(String courtName) { this.courtName = courtName; }
    
    public Long getSportId() { return sportId; }
    public void setSportId(Long sportId) { this.sportId = sportId; }
    
    public String getCourtType() { return courtType; }
    public void setCourtType(String courtType) { this.courtType = courtType; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}