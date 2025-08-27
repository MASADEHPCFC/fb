-- Activities Table DDL
-- Table to store business activities with bilingual support

CREATE TABLE activities (
    activitycode VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    name_arabic VARCHAR(255) NOT NULL,
    description VARCHAR(500) NOT NULL,
    description_arabic VARCHAR(500) NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER NOT NULL,
    updated_by INTEGER,
    
    -- Primary key
    CONSTRAINT pk_activities PRIMARY KEY (activitycode),
    
    -- Foreign key constraints (assuming users table exists)
    CONSTRAINT fk_activities_created_by FOREIGN KEY (created_by) REFERENCES users(id),
    CONSTRAINT fk_activities_updated_by FOREIGN KEY (updated_by) REFERENCES users(id)
);

-- Indexes for better performance
CREATE INDEX idx_activities_name ON activities(name);
CREATE INDEX idx_activities_created_by ON activities(created_by);
CREATE INDEX idx_activities_updated_by ON activities(updated_by);
CREATE INDEX idx_activities_created ON activities(created);

-- Trigger to automatically update the modified timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.modified = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_activities_modified 
    BEFORE UPDATE ON activities 
    FOR EACH ROW 
    EXECUTE FUNCTION update_modified_column();

-- Comments for documentation
COMMENT ON TABLE activities IS 'Business activities with bilingual support (English/Arabic)';
COMMENT ON COLUMN activities.activitycode IS 'Unique identifier for the activity';
COMMENT ON COLUMN activities.name IS 'Activity name in English';
COMMENT ON COLUMN activities.name_arabic IS 'Activity name in Arabic';
COMMENT ON COLUMN activities.description IS 'Activity description in English';
COMMENT ON COLUMN activities.description_arabic IS 'Activity description in Arabic';
COMMENT ON COLUMN activities.created IS 'Timestamp when record was created';
COMMENT ON COLUMN activities.modified IS 'Timestamp when record was last modified';
COMMENT ON COLUMN activities.created_by IS 'User ID who created the record';
COMMENT ON COLUMN activities.updated_by IS 'User ID who last updated the record';

-- Sample data insert (optional)
-- INSERT INTO activities (activitycode, name, name_arabic, description, description_arabic, created_by) 
-- VALUES 
-- ('ACT001', 'General Trading', 'التجارة العامة', 'General trading and commercial activities', 'الأنشطة التجارية والتجارية العامة', 1),
-- ('ACT002', 'IT Services', 'خدمات تكنولوجيا المعلومات', 'Information technology and software services', 'خدمات تكنولوجيا المعلومات والبرمجيات', 1),
-- ('ACT003', 'Consulting', 'الاستشارات', 'Business and management consulting services', 'خدمات الاستشارات التجارية والإدارية', 1);

