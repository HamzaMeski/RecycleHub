package com.recyclehub.backend.enums;

public enum WasteType {
    PLASTIC(2),    // 2 points per kg
    GLASS(1),      // 1 point per kg
    PAPER(1),      // 1 point per kg
    METAL(5);      // 5 points per kg

    private final int pointsPerKg;

    WasteType(int pointsPerKg) {
        this.pointsPerKg = pointsPerKg;
    }

    public int getPointsPerKg() {
        return pointsPerKg;
    }
}